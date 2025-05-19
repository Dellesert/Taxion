package com.example.tahion

import android.content.Context
import android.util.Log
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.snapshots.SnapshotStateList
import androidx.compose.runtime.toMutableStateList
import androidx.lifecycle.ViewModel
import androidx.lifecycle.viewModelScope
import kotlinx.coroutines.launch
import retrofit2.HttpException

class AppViewModel(context: Context) : ViewModel() {
    internal val preferences = Preferences(context)
    private val apiService = RetrofitClient.apiService

    val username = mutableStateOf("")
    val email = mutableStateOf("")
    val password = mutableStateOf("")
    val isLoading = mutableStateOf(false)
    val errorMessage = mutableStateOf<String?>(null)
    val isAuthenticated = mutableStateOf(preferences.getToken() != null)
    val userRole = mutableStateOf(preferences.getRole() ?: "employee")

    val chats: SnapshotStateList<Chat> = emptyList<Chat>().toMutableStateList()
    val messages: SnapshotStateList<Message> = emptyList<Message>().toMutableStateList()
    val newMessage = mutableStateOf("")
    val chatUsers: SnapshotStateList<User> = emptyList<User>().toMutableStateList()

    val tasks: SnapshotStateList<Task> = emptyList<Task>().toMutableStateList()
    val newTaskTitle = mutableStateOf("")
    val newTaskDescription = mutableStateOf("")
    val allUsers: SnapshotStateList<User> = emptyList<User>().toMutableStateList()
    val selectedUserId = mutableStateOf<Int?>(null)

    // Кэш пользователей
    private val userCache: MutableMap<String, User> = mutableMapOf()

    // Хранилище сообщений по chatId
    private val messagesByChat: MutableMap<String, SnapshotStateList<Message>> = mutableMapOf()

    init {
        // Восстанавливаем username из Preferences при создании ViewModel
        preferences.getUsername()?.let { uname ->
            Log.d("AppViewModel", "Restoring username from Preferences: $uname")
            username.value = uname
        }
    }

    fun onUsernameChange(newUsername: String) {
        Log.d("AppViewModel", "onUsernameChange called with: $newUsername")
        username.value = newUsername
    }

    fun onEmailChange(newEmail: String) {
        Log.d("AppViewModel", "onEmailChange called with: $newEmail")
        email.value = newEmail
    }

    fun onPasswordChange(newPassword: String) {
        Log.d("AppViewModel", "onPasswordChange called with: $newPassword")
        password.value = newPassword
    }

    fun login(onSuccess: () -> Unit) {
        viewModelScope.launch {
            Log.d("AppViewModel", "Starting login process")
            isLoading.value = true
            errorMessage.value = null
            try {
                if (username.value.isBlank()) {
                    Log.d("AppViewModel", "Validation failed: Username is blank")
                    errorMessage.value = "Пожалуйста, введите имя пользователя"
                    return@launch
                }
                if (password.value.isBlank()) {
                    Log.d("AppViewModel", "Validation failed: Password is blank")
                    errorMessage.value = "Пожалуйста, введите пароль"
                    return@launch
                }
                // Сохраняем введённое имя пользователя перед отправкой запроса
                val inputUsername = username.value
                Log.d("AppViewModel", "Logging in with username: ${username.value}, password: ${password.value}")
                val response = apiService.login(
                    LoginRequest(
                        username = username.value,
                        password = password.value
                    )
                )
                Log.d("AppViewModel", "Login response: $response")
                if (response.accessToken == null) {
                    Log.e("AppViewModel", "AccessToken is null in login response")
                    errorMessage.value = "Ошибка: сервер не вернул токен при входе"
                    return@launch
                }
                preferences.saveToken(response.accessToken)
                Log.d("AppViewModel", "Token saved: ${preferences.getToken()}")
                response.userId?.let { userId ->
                    preferences.saveUserId(userId)
                } ?: Log.d("AppViewModel", "No userId in response")
                response.departmentId?.let { deptId ->
                    Log.d("AppViewModel", "Saving departmentId: $deptId")
                    preferences.saveDepartmentId(deptId)
                } ?: Log.d("AppViewModel", "No departmentId in response")
                response.role?.let { role ->
                    Log.d("AppViewModel", "Saving role: $role")
                    preferences.saveRole(role)
                } ?: Log.d("AppViewModel", "No role in response")
                response.username?.let { uname: String ->
                    Log.d("AppViewModel", "Saving username from response: $uname")
                    username.value = uname
                    preferences.saveUsername(uname)
                } ?: run {
                    Log.d("AppViewModel", "No username in response, using input username: $inputUsername")
                    if (inputUsername.isNotBlank()) {
                        username.value = inputUsername
                        preferences.saveUsername(inputUsername)
                    } else {
                        // Дополнительно можем запросить пользователя по userId
                        response.userId?.let { userId ->
                            val user = getUserById(userId)
                            user?.username?.let { uname ->
                                Log.d("AppViewModel", "Fetched username from user: $uname")
                                username.value = uname
                                preferences.saveUsername(uname)
                            } ?: Log.d("AppViewModel", "Failed to fetch username for userId: $userId")
                        } ?: Log.d("AppViewModel", "No userId in response to fetch username")
                    }
                }
                userRole.value = preferences.getRole() ?: "employee"
                isAuthenticated.value = true
                Log.d("AppViewModel", "Calling onSuccess callback for login")
                onSuccess()
            } catch (e: Exception) {
                Log.e("AppViewModel", "Login error: ${e.message}", e)
                errorMessage.value = e.message ?: "Ошибка входа"
            } finally {
                Log.d("AppViewModel", "Login process finished, isLoading: false")
                isLoading.value = false
            }
        }
    }

    fun register(onSuccess: () -> Unit) {
        viewModelScope.launch {
            Log.d("AppViewModel", "Starting registration process")
            isLoading.value = true
            errorMessage.value = null
            try {
                if (username.value.isBlank()) {
                    Log.d("AppViewModel", "Validation failed: Username is blank")
                    errorMessage.value = "Пожалуйста, введите имя пользователя"
                    return@launch
                }
                if (email.value.isBlank()) {
                    Log.d("AppViewModel", "Validation failed: Email is blank")
                    errorMessage.value = "Пожалуйста, введите email"
                    return@launch
                }
                if (password.value.isBlank()) {
                    Log.d("AppViewModel", "Validation failed: Password is blank")
                    errorMessage.value = "Пожалуйста, введите пароль"
                    return@launch
                }
                // Сохраняем введённое имя пользователя перед отправкой запроса
                val inputUsername = username.value
                Log.d("AppViewModel", "Registering with username: ${username.value}, email: ${email.value}, password: ${password.value}")
                val response = apiService.register(
                    AuthRequest(
                        username = username.value,
                        email = email.value,
                        password = password.value
                    )
                )
                Log.d("AppViewModel", "Register response: $response")
                preferences.saveUserId(response.userId)
                response.role?.let { role ->
                    Log.d("AppViewModel", "Saving role: $role")
                    preferences.saveRole(role)
                } ?: Log.d("AppViewModel", "No role in response")
                response.username?.let { uname: String ->
                    Log.d("AppViewModel", "Saving username from response: $uname")
                    username.value = uname
                    preferences.saveUsername(uname)
                } ?: run {
                    Log.d("AppViewModel", "No username in response, using input username: $inputUsername")
                    if (inputUsername.isNotBlank()) {
                        username.value = inputUsername
                        preferences.saveUsername(inputUsername)
                    } else {
                        // Дополнительно можем запросить пользователя по userId
                        response.userId?.let { userId ->
                            val user = getUserById(userId)
                            user?.username?.let { uname ->
                                Log.d("AppViewModel", "Fetched username from user: $uname")
                                username.value = uname
                                preferences.saveUsername(uname)
                            } ?: Log.d("AppViewModel", "Failed to fetch username for userId: $userId")
                        } ?: Log.d("AppViewModel", "No userId in response to fetch username")
                    }
                }
                userRole.value = preferences.getRole() ?: "employee"
                Log.d("AppViewModel", "Calling onSuccess callback for register")
                onSuccess()
            } catch (e: Exception) {
                Log.e("AppViewModel", "Register error: ${e.message}", e)
                errorMessage.value = e.message ?: "Ошибка регистрации"
            } finally {
                Log.d("AppViewModel", "Registration process finished, isLoading: false")
                isLoading.value = false
            }
        }
    }

    fun logout(onSuccess: () -> Unit) {
        Log.d("AppViewModel", "Logging out")
        preferences.clear()
        isAuthenticated.value = false
        userRole.value = "employee"
        username.value = ""
        email.value = ""
        password.value = ""
        chats.clear()
        messages.clear()
        tasks.clear()
        allUsers.clear()
        chatUsers.clear()
        userCache.clear()
        selectedUserId.value = null
        messagesByChat.clear() // Очищаем сообщения при выходе
        onSuccess()
    }

    fun createChat(name: String) {
        if (userRole.value != "admin") {
            errorMessage.value = "Только администратор может создавать чаты"
            return
        }
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                val userId = preferences.getUserId()?.toIntOrNull() ?: throw IllegalStateException("User ID not found")
                val chat = apiService.createChat("Bearer $token", CreateChatRequest(name, userId))
                chats.add(chat)
            } catch (e: Exception) {
                Log.e("AppViewModel", "Create chat error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun deleteChat(chatId: String) {
        if (userRole.value != "admin") {
            errorMessage.value = "Только администратор может удалять чаты"
            return
        }
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Deleting chat with ID: $chatId")
                apiService.deleteChat("Bearer $token", chatId)
                chats.removeIf { it.id == chatId }
                messagesByChat.remove(chatId) // Удаляем сообщения чата
                Log.d("AppViewModel", "Chat deleted: $chatId")
            } catch (e: Exception) {
                Log.e("AppViewModel", "Delete chat error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun addUserToChat(chatId: String, username: String) {
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                apiService.addUserToChat("Bearer $token", chatId, AddUserToChatRequest(username))
            } catch (e: Exception) {
                Log.e("AppViewModel", "Add user to chat error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun loadChatUsers(chatId: String) {
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Loading chat users for chatId: $chatId")
                val result = apiService.getChatUsers("Bearer $token", chatId)
                Log.d("AppViewModel", "Chat users loaded: $result")
                chatUsers.clear()
                chatUsers.addAll(result)
            } catch (e: Exception) {
                Log.e("AppViewModel", "Load chat users error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun loadChats() {
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Loading chats with token: $token")
                Log.d("AppViewModel", "User role: ${userRole.value}")
                val userId = preferences.getUserId()
                Log.d("AppViewModel", "User ID: $userId")
                if (userId == null) {
                    Log.e("AppViewModel", "User ID is null")
                    errorMessage.value = "Ошибка: ID пользователя не найден"
                    return@launch
                }
                val result = if (userRole.value == "admin") {
                    // Админ видит все чаты
                    apiService.getChats("Bearer $token")
                } else {
                    // Обычный пользователь видит только свои чаты
                    try {
                        apiService.getUserChats("Bearer $token", userId)
                    } catch (e: HttpException) {
                        if (e.code() == 404) {
                            Log.d("AppViewModel", "No chats found for user: $userId")
                            emptyList()
                        } else {
                            throw e
                        }
                    }
                }
                Log.d("AppViewModel", "Chats loaded: $result")
                chats.clear()
                chats.addAll(result)

                // Загружаем сообщения для каждого чата
                result.forEach { chat ->
                    if (!messagesByChat.containsKey(chat.id)) {
                        messagesByChat[chat.id] = mutableListOf<Message>().toMutableStateList()
                    }
                    loadMessages(chat.id)
                }
            } catch (e: Exception) {
                Log.e("AppViewModel", "Load chats error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun loadMessages(chatId: String) {
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Loading messages with token: $token for chatId: $chatId")
                val result = apiService.getMessages("Bearer $token", chatId)
                Log.d("AppViewModel", "Messages loaded: $result")

                // Получаем или создаём список сообщений для этого чата
                val chatMessages = messagesByChat.getOrPut(chatId) { mutableListOf<Message>().toMutableStateList() }

                // Добавляем только новые сообщения (избегаем дубликатов по ID)
                result.forEach { message ->
                    if (chatMessages.none { it.id == message.id }) {
                        chatMessages.add(message)
                        // Кэшируем пользователя
                        message.user?.let { user ->
                            userCache[user.id] = user
                        }
                    }
                }

                // Обновляем messages для текущего экрана
                messages.clear()
                messages.addAll(chatMessages)
            } catch (e: Exception) {
                Log.e("AppViewModel", "Load messages error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun onNewMessageChange(text: String) {
        newMessage.value = text
    }

    fun sendMessage(chatId: String, message: Message) {
        // Добавляем сообщение в список сообщений для этого чата
        val chatMessages = messagesByChat.getOrPut(chatId) { mutableListOf<Message>().toMutableStateList() }
        if (chatMessages.none { it.id == message.id }) {
            chatMessages.add(message)
        }
        // Обновляем messages для текущего экрана
        messages.clear()
        messages.addAll(chatMessages)
    }

    fun loadUsers() {
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Loading users with token: $token")
                val result = apiService.getAllUsers("Bearer $token")
                Log.d("AppViewModel", "Users loaded: $result")
                allUsers.clear()
                allUsers.addAll(result)
            } catch (e: Exception) {
                Log.e("AppViewModel", "Load users error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun selectUserForTask(userId: Int?) {
        selectedUserId.value = userId
        Log.d("AppViewModel", "Selected user for task: $userId")
    }

    fun loadTasks() {
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Loading tasks with token: $token")
                Log.d("AppViewModel", "User role: ${userRole.value}")
                val userId = preferences.getUserId()
                Log.d("AppViewModel", "User ID: $userId")
                if (userId == null) {
                    Log.e("AppViewModel", "User ID is null")
                    errorMessage.value = "Ошибка: ID пользователя не найден"
                    return@launch
                }
                val result = if (userRole.value == "admin") {
                    // Админ видит все задачи
                    apiService.getTasks("Bearer $token")
                } else {
                    // Обычный пользователь видит только свои задачи
                    try {
                        apiService.getUserTasks("Bearer $token", userId)
                    } catch (e: HttpException) {
                        if (e.code() == 404) {
                            Log.d("AppViewModel", "No tasks found for user: $userId")
                            emptyList()
                        } else {
                            throw e
                        }
                    }
                }
                Log.d("AppViewModel", "Tasks loaded: $result")
                tasks.clear()
                tasks.addAll(result)
            } catch (e: Exception) {
                Log.e("AppViewModel", "Load tasks error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun onNewTaskTitleChange(title: String) {
        newTaskTitle.value = title
    }

    fun onNewTaskDescriptionChange(description: String) {
        newTaskDescription.value = description
    }

    fun createTask(assignedUserId: Int) {
        if (userRole.value != "admin") {
            errorMessage.value = "Только администратор может создавать задачи"
            return
        }
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Creating task with token: $token")
                val task = apiService.createTask(
                    "Bearer $token",
                    CreateTaskRequest(
                        title = newTaskTitle.value,
                        description = newTaskDescription.value,
                        assigned_user_id = assignedUserId
                    )
                )
                Log.d("AppViewModel", "Task created: $task")
                tasks.add(task)
                newTaskTitle.value = ""
                newTaskDescription.value = ""
                selectedUserId.value = null
            } catch (e: Exception) {
                Log.e("AppViewModel", "Create task error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun updateTaskStatus(taskId: String, completed: Boolean) {
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Updating task status with token: $token")
                val updatedTask = apiService.updateTask(
                    "Bearer $token",
                    taskId,
                    UpdateTaskRequest(completed)
                )
                Log.d("AppViewModel", "Task updated: $updatedTask")
                val index = tasks.indexOfFirst { it.id == taskId }
                if (index != -1) {
                    tasks[index] = updatedTask
                }
            } catch (e: Exception) {
                Log.e("AppViewModel", "Update task error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    fun deleteTask(taskId: String) {
        if (userRole.value != "admin") {
            errorMessage.value = "Только администратор может удалять задачи"
            return
        }
        viewModelScope.launch {
            try {
                val token = preferences.getToken() ?: return@launch
                Log.d("AppViewModel", "Deleting task with ID: $taskId")
                apiService.deleteTask("Bearer $token", taskId)
                tasks.removeIf { it.id == taskId }
                Log.d("AppViewModel", "Task deleted: $taskId")
            } catch (e: Exception) {
                Log.e("AppViewModel", "Delete task error: ${e.message}", e)
                errorMessage.value = e.message
            }
        }
    }

    // Метод для получения пользователя по ID (для WebSocket-сообщений)
    suspend fun getUserById(userId: String): User? {
        if (userCache.containsKey(userId)) {
            return userCache[userId]
        }
        try {
            val token = preferences.getToken() ?: return null
            val user = apiService.getUserById("Bearer $token", userId)
            userCache[userId] = user
            return user
        } catch (e: Exception) {
            Log.e("AppViewModel", "Get user error: ${e.message}", e)
            return null
        }
    }
}
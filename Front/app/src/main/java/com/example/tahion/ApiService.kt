package com.example.tahion

import com.google.gson.annotations.SerializedName
import okhttp3.OkHttpClient
import okhttp3.logging.HttpLoggingInterceptor
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import retrofit2.http.*

data class AuthRequest(
    val username: String,
    val email: String,
    val password: String
)

data class LoginRequest(
    val username: String,
    val password: String
)

data class RegisterResponse(
    val userId: String,
    val role: String? = null,
    val username: String? = null
)

data class AuthResponse(
    @SerializedName("access_token") val accessToken: String?,
    val userId: String?,
    val username: String? = null,
    val role: String? = null,
    val departmentId: String? = null
)

data class Chat(
    val id: String,
    val name: String,
    val created_by: Int? = null,
    val created_at: String? = null,
    val messages: List<Message>? = null
)

data class User(
    val id: String,
    val email: String,
    val username: String,
    val user_type: String,
    val password: String? = null,
    val logged_in: Boolean? = null,
    val user_token: String? = null,
    val token_expiration: String? = null,
    val token_vk: String? = null,
    val token_google: String? = null
)

data class Message(
    val id: String,
    val chatId: String,
    val userId: String,
    @SerializedName("message_text") val text: String,
    val timestamp: String,
    val user: User? = null
) {
    fun getTimestampAsLong(): Long {
        return try {
            if (timestamp.contains("T")) {
                java.text.SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS'Z'", java.util.Locale.getDefault())
                    .apply { timeZone = java.util.TimeZone.getTimeZone("UTC") }
                    .parse(timestamp)?.time ?: System.currentTimeMillis()
            } else {
                timestamp.toLong()
            }
        } catch (e: Exception) {
            System.currentTimeMillis()
        }
    }

    fun getDisplayName(): String {
        return user?.username ?: userId
    }
}

data class SendMessageRequest(
    @SerializedName("chat_id") val chatId: String,
    val text: String
)

data class CreateChatRequest(val name: String, val created_by: Int)

data class AddUserToChatRequest(val username: String)

data class Task(
    val id: String,
    val title: String,
    val description: String,
    val completed: Boolean,
    val assigned_user_id: Int,
    val created_at: String? = null,
    val updated_at: String? = null,
    val assignedUser: User? = null
)

data class CreateTaskRequest(
    val title: String,
    val description: String,
    val assigned_user_id: Int
)

data class UpdateTaskRequest(
    val completed: Boolean
)

data class Department(val id: String, val name: String)

interface ApiService {
    @POST("auth/register")
    suspend fun register(@Body request: AuthRequest): RegisterResponse

    @POST("auth/login")
    suspend fun login(@Body request: LoginRequest): AuthResponse

    @GET("chats")
    suspend fun getChats(@Header("Authorization") token: String): List<Chat>

    @GET("chats/user/{userId}")
    suspend fun getUserChats(
        @Header("Authorization") token: String,
        @Path("userId") userId: String
    ): List<Chat>

    @POST("chats")
    suspend fun createChat(
        @Header("Authorization") token: String,
        @Body request: CreateChatRequest
    ): Chat

    @DELETE("chats/{id}")
    suspend fun deleteChat(
        @Header("Authorization") token: String,
        @Path("id") chatId: String
    )

    @POST("chats/{chatId}/users/by-username")
    suspend fun addUserToChat(
        @Header("Authorization") token: String,
        @Path("chatId") chatId: String,
        @Body request: AddUserToChatRequest
    ): ChatUserResponse

    @GET("messages/chat/{chatId}")
    suspend fun getMessages(
        @Header("Authorization") token: String,
        @Path("chatId") chatId: String
    ): List<Message>

    @POST("messages")
    suspend fun sendMessage(
        @Header("Authorization") token: String,
        @Body request: SendMessageRequest
    ): Message

    @GET("tasks")
    suspend fun getTasks(@Header("Authorization") token: String): List<Task>

    @GET("tasks/user/{userId}")
    suspend fun getUserTasks(
        @Header("Authorization") token: String,
        @Path("userId") userId: String
    ): List<Task>

    @POST("tasks")
    suspend fun createTask(
        @Header("Authorization") token: String,
        @Body request: CreateTaskRequest
    ): Task

    @PATCH("tasks/{id}")
    suspend fun updateTask(
        @Header("Authorization") token: String,
        @Path("id") taskId: String,
        @Body request: UpdateTaskRequest
    ): Task

    @DELETE("tasks/{id}")
    suspend fun deleteTask(
        @Header("Authorization") token: String,
        @Path("id") taskId: String
    )

    @GET("users/{userId}")
    suspend fun getUserById(
        @Header("Authorization") token: String,
        @Path("userId") userId: String
    ): User

    @GET("chats/{chatId}/users")
    suspend fun getChatUsers(
        @Header("Authorization") token: String,
        @Path("chatId") chatId: String
    ): List<User>

    @GET("users")
    suspend fun getAllUsers(
        @Header("Authorization") token: String
    ): List<User>
}

data class ChatUserResponse(
    val id: String,
    val chatId: String? = null,
    val userId: String? = null
)

object RetrofitClient {
    private val retrofit: Retrofit by lazy {
        val logging = HttpLoggingInterceptor().apply {
            level = HttpLoggingInterceptor.Level.BODY
        }
        val client = OkHttpClient.Builder()
            .addInterceptor(logging)
            .build()

        Retrofit.Builder()
            .baseUrl("http://10.0.2.2:3000/")
            .client(client)
            .addConverterFactory(GsonConverterFactory.create())
            .build()
    }

    val apiService: ApiService by lazy {
        retrofit.create(ApiService::class.java)
    }
}
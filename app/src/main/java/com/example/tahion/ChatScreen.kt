package com.example.tahion

import android.util.Log
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.runtime.setValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatScreen(navController: NavController, viewModel: AppViewModel) {
    val chats = viewModel.chats
    val userRole = viewModel.userRole.value
    val isLoading = viewModel.isLoading.value
    val errorMessage = viewModel.errorMessage.value
    val allUsers = viewModel.allUsers

    // Состояние для выбранного пользователя
    var selectedUserId by remember { mutableStateOf<Int?>(null) }

    // Загружаем чаты и пользователей при открытии экрана
    LaunchedEffect(Unit) {
        viewModel.loadChats()
        if (userRole == "admin") {
            viewModel.loadUsers()
        }
    }

    var newChatName by remember { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Чаты") },
                navigationIcon = {
                    IconButton(onClick = { navController.navigate("main_screen") }) {
                        Icon(Icons.Default.ArrowBack, contentDescription = "Назад")
                    }
                }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(padding)
                .padding(16.dp)
        ) {
            if (userRole == "admin") {
                Text("Создать новый чат:")
                OutlinedTextField(
                    value = newChatName,
                    onValueChange = { newChatName = it },
                    label = { Text("Название чата") },
                    modifier = Modifier.fillMaxWidth()
                )
                Spacer(modifier = Modifier.height(8.dp))
                Button(
                    onClick = {
                        if (newChatName.isNotBlank()) {
                            viewModel.createChat(newChatName)
                            newChatName = ""
                        }
                    },
                    enabled = !isLoading,
                    modifier = Modifier.fillMaxWidth()
                ) {
                    if (isLoading) {
                        CircularProgressIndicator(
                            modifier = Modifier.size(24.dp)
                        )
                    } else {
                        Text("Создать")
                    }
                }
                Spacer(modifier = Modifier.height(16.dp))

                Text("Добавить пользователя в чат:")
                LazyColumn(
                    modifier = Modifier.height(100.dp)
                ) {
                    items(allUsers) { user ->
                        Button(
                            onClick = { selectedUserId = user.id.toInt() },
                            colors = ButtonDefaults.buttonColors(
                                containerColor = if (selectedUserId == user.id.toInt()) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.secondary
                            ),
                            modifier = Modifier.fillMaxWidth()
                        ) {
                            Text(user.username)
                        }
                    }
                }
                Spacer(modifier = Modifier.height(8.dp))
                Row(
                    modifier = Modifier.fillMaxWidth(),
                    horizontalArrangement = Arrangement.SpaceBetween
                ) {
                    chats.forEach { chat ->
                        Button(
                            onClick = {
                                if (selectedUserId != null) {
                                    viewModel.addUserToChat(chat.id, allUsers.find { it.id.toInt() == selectedUserId }?.username ?: "")
                                    selectedUserId = null
                                } else {
                                    viewModel.errorMessage.value = "Выберите пользователя для добавления в чат"
                                }
                            },
                            enabled = !isLoading,
                            modifier = Modifier.weight(1f)
                        ) {
                            Text("Добавить в ${chat.name}")
                        }
                        Spacer(modifier = Modifier.width(8.dp))
                    }
                }
                Spacer(modifier = Modifier.height(16.dp))
            }

            if (errorMessage != null) {
                Text(
                    text = errorMessage,
                    color = androidx.compose.material3.MaterialTheme.colorScheme.error,
                    modifier = Modifier.padding(bottom = 16.dp)
                )
            }

            Text("Доступные чаты:")
            LazyColumn(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(horizontal = 16.dp)
            ) {
                items(chats) { chat ->
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(16.dp),
                        horizontalArrangement = Arrangement.SpaceBetween,
                        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
                    ) {
                        Text(
                            text = chat.name,
                            modifier = Modifier
                                .weight(1f)
                                .clickable {
                                    viewModel.loadMessages(chat.id)
                                    Log.d("ChatScreen", "Navigating to chat_detail/${chat.id}")
                                    navController.navigate("chat_detail/${chat.id}")
                                }
                        )
                        Text(text = "Сообщений: ${chat.messages?.size ?: 0}")
                        if (userRole == "admin") {
                            Button(
                                onClick = { viewModel.deleteChat(chat.id) },
                                colors = ButtonDefaults.buttonColors(
                                    containerColor = MaterialTheme.colorScheme.error
                                )
                            ) {
                                Text("Удалить")
                            }
                        }
                    }
                    Spacer(modifier = Modifier.height(8.dp))
                }
            }
        }
    }
}
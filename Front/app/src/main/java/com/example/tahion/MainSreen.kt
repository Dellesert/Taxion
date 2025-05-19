package com.example.tahion

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import androidx.navigation.NavController
import android.util.Log

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun MainScreen(navController: NavController, viewModel: AppViewModel) {
    val userRole = viewModel.userRole.value
    val errorMessage = viewModel.errorMessage.value
    val username = viewModel.username.value

    // Логируем username для отладки
    LaunchedEffect(username) {
        Log.d("MainScreen", "Username: $username")
    }

    // Флаг для отображения приветственного сообщения
    val showWelcome = remember { mutableStateOf(true) }

    // Загружаем данные при открытии экрана (после приветствия)
    LaunchedEffect(showWelcome.value) {
        if (!showWelcome.value) {
            viewModel.loadChats()
            viewModel.loadTasks()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Тахион") }
            )
        }
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(16.dp),
            verticalArrangement = Arrangement.Center,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            if (showWelcome.value) {
                // Приветственное сообщение
                Text(
                    text = if (username.isNotBlank()) "Добро пожаловать, $username!" else "Добро пожаловать!",
                    fontSize = 24.sp,
                    fontWeight = FontWeight.Bold,
                    modifier = Modifier.padding(bottom = 16.dp)
                )
                Button(
                    onClick = { showWelcome.value = false },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Продолжить")
                }
                Spacer(modifier = Modifier.height(8.dp))
                Button(
                    onClick = { viewModel.logout { navController.navigate("login") } },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = androidx.compose.material3.MaterialTheme.colorScheme.error
                    )
                ) {
                    Text("Выйти")
                }
            } else {
                // Основной экран
                if (errorMessage != null) {
                    Text(
                        text = errorMessage,
                        color = androidx.compose.material3.MaterialTheme.colorScheme.error,
                        modifier = Modifier.padding(bottom = 16.dp)
                    )
                }
                // Кнопка "Добавить чат" только для администратора
                if (userRole == "admin") {
                    Button(
                        onClick = { navController.navigate("chat_screen") },
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text("Добавить чат")
                    }
                    Spacer(modifier = Modifier.height(16.dp))
                }
                Button(
                    onClick = { navController.navigate("chat_screen") },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Чаты")
                }
                Spacer(modifier = Modifier.height(16.dp))
                Button(
                    onClick = { navController.navigate("tasks_screen") },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Задачи")
                }
                Spacer(modifier = Modifier.height(16.dp))
                Button(
                    onClick = { viewModel.logout { navController.navigate("login") } },
                    modifier = Modifier.fillMaxWidth(),
                    colors = ButtonDefaults.buttonColors(
                        containerColor = androidx.compose.material3.MaterialTheme.colorScheme.error
                    )
                ) {
                    Text("Выйти")
                }
            }
        }
    }
}
package com.example.tahion

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ButtonDefaults
import androidx.compose.material3.Card
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun TasksScreen(viewModel: AppViewModel, navController: NavController) {
    val tasks = viewModel.tasks
    val userRole = viewModel.userRole.value
    val errorMessage = viewModel.errorMessage.value

    // Загружаем задачи при открытии экрана
    LaunchedEffect(Unit) {
        viewModel.loadTasks()
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Задачи") },
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
                Button(
                    onClick = { navController.navigate("create_task") },
                    modifier = Modifier.fillMaxWidth()
                ) {
                    Text("Добавить задачу")
                }
                Spacer(modifier = Modifier.height(16.dp))
            }

            if (errorMessage != null) {
                Text(
                    text = errorMessage,
                    color = MaterialTheme.colorScheme.error,
                    modifier = Modifier.padding(bottom = 16.dp)
                )
            }

            Text("Список задач:")
            if (tasks.isEmpty()) {
                Text(
                    text = "У вас нет задач",
                    modifier = Modifier.padding(16.dp)
                )
            } else {
                LazyColumn {
                    items(tasks) { task ->
                        Card(
                            modifier = Modifier
                                .fillMaxWidth()
                                .padding(vertical = 4.dp)
                        ) {
                            Column(modifier = Modifier.padding(16.dp)) {
                                Text("${task.title} (${if (task.completed) "Завершена" else "Не завершена"})")
                                Text(task.description)
                                if (userRole == "admin") {
                                    Text("Назначено: ${task.assignedUser?.username ?: "Неизвестно"}")
                                }
                                Row(
                                    horizontalArrangement = Arrangement.SpaceBetween,
                                    modifier = Modifier.fillMaxWidth()
                                ) {
                                    Row {
                                        Button(
                                            onClick = { viewModel.updateTaskStatus(task.id, false) },
                                            enabled = task.completed
                                        ) {
                                            Text("Возобновить")
                                        }
                                        Spacer(modifier = Modifier.width(8.dp))
                                        Button(
                                            onClick = { viewModel.updateTaskStatus(task.id, true) },
                                            enabled = !task.completed
                                        ) {
                                            Text("Завершить")
                                        }
                                    }
                                    if (userRole == "admin") {
                                        Button(
                                            onClick = { viewModel.deleteTask(task.id) },
                                            colors = ButtonDefaults.buttonColors(
                                                containerColor = MaterialTheme.colorScheme.error
                                            )
                                        ) {
                                            Text("Удалить")
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
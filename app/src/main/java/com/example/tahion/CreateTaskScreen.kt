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
fun CreateTaskScreen(viewModel: AppViewModel, navController: NavController) {
    val newTaskTitle = viewModel.newTaskTitle.value
    val newTaskDescription = viewModel.newTaskDescription.value
    val userRole = viewModel.userRole.value
    val allUsers = viewModel.allUsers
    val selectedUserId = viewModel.selectedUserId.value
    val errorMessage = viewModel.errorMessage.value

    // Загружаем пользователей при открытии экрана
    LaunchedEffect(Unit) {
        if (userRole == "admin") {
            viewModel.loadUsers()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Создать задачу") },
                navigationIcon = {
                    IconButton(onClick = { navController.navigate("tasks_screen") }) {
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
            if (errorMessage != null) {
                Text(
                    text = errorMessage,
                    color = MaterialTheme.colorScheme.error,
                    modifier = Modifier.padding(bottom = 16.dp)
                )
            }
            OutlinedTextField(
                value = newTaskTitle,
                onValueChange = { viewModel.onNewTaskTitleChange(it) },
                label = { Text("Название") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            OutlinedTextField(
                value = newTaskDescription,
                onValueChange = { viewModel.onNewTaskDescriptionChange(it) },
                label = { Text("Описание") },
                modifier = Modifier.fillMaxWidth()
            )
            Spacer(modifier = Modifier.height(8.dp))
            Text("Назначить пользователю:")
            LazyColumn(
                modifier = Modifier.height(100.dp)
            ) {
                items(allUsers) { user ->
                    Button(
                        onClick = { viewModel.selectUserForTask(user.id.toInt()) },
                        colors = ButtonDefaults.buttonColors(
                            containerColor = if (selectedUserId == user.id.toInt()) MaterialTheme.colorScheme.primary else MaterialTheme.colorScheme.secondary
                        ),
                        modifier = Modifier.fillMaxWidth()
                    ) {
                        Text(user.username)
                    }
                }
            }
            Spacer(modifier = Modifier.height(16.dp))
            Button(
                onClick = {
                    if (newTaskTitle.isBlank()) {
                        viewModel.errorMessage.value = "Название задачи не может быть пустым"
                        return@Button
                    }
                    if (selectedUserId == null) {
                        viewModel.errorMessage.value = "Выберите пользователя для назначения задачи"
                        return@Button
                    }
                    viewModel.createTask(selectedUserId)
                    navController.navigate("tasks_screen")
                },
                modifier = Modifier.fillMaxWidth()
            ) {
                Text("Создать задачу")
            }
        }
    }
}
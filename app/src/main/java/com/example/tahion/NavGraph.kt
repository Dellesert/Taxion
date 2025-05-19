package com.example.tahion

import androidx.compose.foundation.layout.padding
import androidx.compose.material3.NavigationBar
import androidx.compose.material3.NavigationBarItem
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Modifier
import androidx.compose.ui.platform.LocalContext
import androidx.navigation.NavHostController
import androidx.navigation.NavType
import androidx.navigation.compose.NavHost
import androidx.navigation.compose.composable
import androidx.navigation.compose.currentBackStackEntryAsState
import androidx.navigation.navArgument

@Composable
fun NavGraph(navController: NavHostController) {
    val context = LocalContext.current
    val viewModel = AppViewModel(context)

    val startDestination = if (viewModel.isAuthenticated.value) "main_screen" else "login"

    // Получаем текущий маршрут для определения активного пункта
    val currentBackStackEntry by navController.currentBackStackEntryAsState()
    val currentRoute = currentBackStackEntry?.destination?.route

    // Определяем, показывать ли NavigationBar
    val showBottomBar = when (currentRoute) {
        "login", "register", "chat_detail/{chatId}", "create_task" -> false
        else -> true
    }

    Scaffold(
        bottomBar = {
            if (showBottomBar) {
                NavigationBar {
                    NavigationBarItem(
                        selected = currentRoute == "main_screen",
                        onClick = {
                            navController.navigate("main_screen") {
                                popUpTo(navController.graph.startDestinationId) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                        label = { Text("Главная") },
                        icon = { /* Можно добавить иконку */ }
                    )
                    NavigationBarItem(
                        selected = currentRoute == "chat_screen",
                        onClick = {
                            navController.navigate("chat_screen") {
                                popUpTo(navController.graph.startDestinationId) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                        label = { Text("Чаты") },
                        icon = { /* Можно добавить иконку */ }
                    )
                    NavigationBarItem(
                        selected = currentRoute == "tasks_screen",
                        onClick = {
                            navController.navigate("tasks_screen") {
                                popUpTo(navController.graph.startDestinationId) {
                                    saveState = true
                                }
                                launchSingleTop = true
                                restoreState = true
                            }
                        },
                        label = { Text("Задачи") },
                        icon = { /* Можно добавить иконку */ }
                    )
                }
            }
        }
    ) { padding ->
        NavHost(
            navController = navController,
            startDestination = startDestination,
            modifier = Modifier.padding(padding)
        ) {
            composable("login") {
                LoginScreen(navController = navController, viewModel = viewModel)
            }
            composable("register") {
                RegisterScreen(navController = navController, viewModel = viewModel)
            }
            composable("main_screen") {
                MainScreen(navController = navController, viewModel = viewModel)
            }
            composable("chat_screen") {
                ChatScreen(navController = navController, viewModel = viewModel)
            }
            composable(
                "chat_detail/{chatId}",
                arguments = listOf(navArgument("chatId") { type = NavType.StringType })
            ) { backStackEntry ->
                val chatId = backStackEntry.arguments?.getString("chatId") ?: ""
                ChatDetailScreen(chatId = chatId, navController = navController, viewModel = viewModel)
            }
            composable("tasks_screen") {
                TasksScreen(viewModel = viewModel, navController = navController)
            }
            composable("create_task") {
                CreateTaskScreen(viewModel = viewModel, navController = navController)
            }
        }
    }
}
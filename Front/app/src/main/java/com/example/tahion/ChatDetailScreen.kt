package com.example.tahion

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.Spacer
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.foundation.lazy.rememberLazyListState
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowBack
import androidx.compose.material3.Button
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.DisposableEffect
import androidx.compose.runtime.LaunchedEffect
import androidx.compose.runtime.remember
import androidx.compose.runtime.rememberCoroutineScope
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import androidx.navigation.NavController
import io.socket.client.IO
import io.socket.emitter.Emitter
import kotlinx.coroutines.launch
import org.json.JSONObject
import java.text.SimpleDateFormat
import java.util.Date
import java.util.Locale

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun ChatDetailScreen(chatId: String, navController: NavController, viewModel: AppViewModel) {
    val messages = viewModel.messages
    val newMessage = viewModel.newMessage
    val userId = viewModel.preferences.getUserId() ?: "Unknown"
    val errorMessage = viewModel.errorMessage.value

    val socket = remember { IO.socket("http://10.0.2.2:3000") }
    val coroutineScope = rememberCoroutineScope()

    val listState = rememberLazyListState()

    LaunchedEffect(chatId) {
        viewModel.loadMessages(chatId)
    }
    LaunchedEffect(messages) {
        if (messages.isNotEmpty()) {
            listState.animateScrollToItem(messages.size - 1)
        }
    }

    DisposableEffect(chatId) {
        socket.connect()

        socket.emit("joinChat", JSONObject().put("chat_id", chatId))

        val onReceiveMessage = Emitter.Listener { args: Array<Any?> ->
            try {
                if (args.isNotEmpty() && args[0] is JSONObject) {
                    val messageData = args[0] as JSONObject
                    val userIdFromMessage = messageData.getString("user_id")
                    coroutineScope.launch {
                        val user = viewModel.getUserById(userIdFromMessage)
                        val message = Message(
                            id = messageData.getString("id"),
                            chatId = messageData.getString("chat_id"),
                            userId = userIdFromMessage,
                            text = messageData.getString("message_text"),
                            timestamp = messageData.getString("timestamp"),
                            user = user
                        )
                        viewModel.sendMessage(chatId, message)
                    }
                } else {
                    println("Unexpected message format: ${args.joinToString()}")
                }
            } catch (e: Exception) {
                println("Error processing message: ${e.message}")
            }
        }
        socket.on("receiveMessage", onReceiveMessage)

        onDispose {
            socket.emit("leaveChat", JSONObject().put("chat_id", chatId))
            socket.off("receiveMessage", onReceiveMessage)
            socket.disconnect()
        }
    }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text("Чат") },
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
        ) {
            if (errorMessage != null) {
                Text(
                    text = errorMessage,
                    color = androidx.compose.material3.MaterialTheme.colorScheme.error,
                    modifier = Modifier.padding(16.dp)
                )
            }
            LazyColumn(
                state = listState,
                modifier = Modifier
                    .fillMaxWidth()
                    .weight(1f)
                    .padding(16.dp)
            ) {
                items(messages) { message ->
                    val isMyMessage = message.userId == userId
                    val timestamp = SimpleDateFormat("HH:mm:ss", Locale.getDefault())
                        .format(Date(message.getTimestampAsLong()))
                    Row(
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp),
                        horizontalArrangement = if (isMyMessage) Arrangement.End else Arrangement.Start
                    ) {
                        Column {
                            Text(
                                text = "${message.getDisplayName()}: ${message.text}",
                                modifier = Modifier.padding(8.dp)
                            )
                            Text(
                                text = timestamp,
                                style = androidx.compose.material3.MaterialTheme.typography.bodySmall,
                                modifier = Modifier.padding(start = 8.dp)
                            )
                        }
                    }
                }
            }
            Row(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp)
            ) {
                OutlinedTextField(
                    value = newMessage.value,
                    onValueChange = { viewModel.onNewMessageChange(it) },
                    label = { Text("Сообщение") },
                    modifier = Modifier.weight(1f)
                )
                Spacer(modifier = Modifier.width(8.dp))
                Button(onClick = {
                    if (newMessage.value.isNotBlank()) {
                        val message = JSONObject().apply {
                            put("chat_id", chatId)
                            put("user_id", userId)
                            put("message_text", newMessage.value)
                            put("timestamp", System.currentTimeMillis().toString())
                        }
                        println("Sending WebSocket message: $message")
                        socket.emit("sendMessage", message)
                        newMessage.value = ""
                    }
                }) {
                    Text("Отправить")
                }
            }
        }
    }
}
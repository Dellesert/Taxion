package com.example.tahion

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.runtime.Composable
import androidx.navigation.compose.rememberNavController

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            TahionApp()
        }
    }
}

@Composable
fun TahionApp() {
    val navController = rememberNavController()
    NavGraph(navController = navController)
}

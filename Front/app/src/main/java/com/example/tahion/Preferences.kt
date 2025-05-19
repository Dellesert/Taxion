package com.example.tahion

import android.content.Context
import android.content.SharedPreferences

class Preferences(context: Context) {
    private val prefs: SharedPreferences = context.getSharedPreferences("TahionPrefs", Context.MODE_PRIVATE)

    fun saveToken(token: String?) {
        prefs.edit().putString("auth_token", token).apply()
    }

    fun getToken(): String? {
        return prefs.getString("auth_token", null)
    }

    fun saveUserId(userId: String) {
        prefs.edit().putString("user_id", userId).apply()
    }

    fun getUserId(): String? {
        return prefs.getString("user_id", null)
    }

    fun saveDepartmentId(departmentId: String) {
        prefs.edit().putString("department_id", departmentId).apply()
    }

    fun getDepartmentId(): String? {
        return prefs.getString("department_id", null)
    }

    fun saveRole(role: String) {
        prefs.edit().putString("role", role).apply()
    }

    fun getRole(): String? {
        return prefs.getString("role", null)
    }

    fun saveUsername(username: String) {
        prefs.edit().putString("username", username).apply()
    }

    fun getUsername(): String? {
        return prefs.getString("username", null)
    }

    fun clear() {
        prefs.edit().clear().apply()
    }
}
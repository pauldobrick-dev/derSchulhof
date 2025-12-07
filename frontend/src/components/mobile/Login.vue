<template>
  <div class="container">
    <div class="text-block">
      <Transition name="fade" mode="out-in">
        <h1
            :key="isLoginActive ? 'login' : (isRegisterActive ? 'register' : 'schulhof')"
            :class="{ 'login-register-clicked': isLoginActive || isRegisterActive }"
        >
          {{ isLoginActive ? 'derLogin' : (isRegisterActive ? 'dieRegistrierung' : 'derSchulhof') }}
        </h1>
      </Transition>

      <!-- ----------------------- -->
      <div
          class="login-inputs"
          :class="{ 'active-login-inputs': isLoginActive }"
      >
        <form id="loginForm" @submit.prevent="handleLoginSubmit">
          <input
              v-model="username"
              type="text"
              id="login-username"
              placeholder="Username"
              required
          >
          <input
              v-model="password"
              type="password"
              id="login-password"
              placeholder="Passwort"
              required
          ><br>
          <button id="login-button-form" type="submit">Einloggen</button>
        </form>

        <!-- Ergebnis anzeigen -->
        <pre v-if="loginResult"> {{ loginResult }} </pre>
      </div>
      <!-- ----------------------- -->

      <!-- ----------------------- -->
      <div
          class="register-inputs"
          :class="{ 'active-register-inputs': isRegisterActive }"
      >
        <form id="registerForm" @submit.prevent="handleRegisterSubmit">
          <input v-model="username"
                 type="text"
                 id="register-username"
                 placeholder="Username"
                 required><br>
          <input v-model="email"
                 type="text"
                 id="register-email"
                 placeholder="Email"
                 required><br>
          <input v-model="password"
                 type="password"
                 id="register-password"
                 placeholder="Passwort"
                 required><br>
          <button type="submit">Registrieren</button>
        </form>

        <!-- Ergebnis anzeigen -->
        <pre v-if="registerResult"> {{ registerResult }} </pre>
      </div>
      <!-- ----------------------- -->

      <span class="description">
        <template v-if="isLoginActive">
          TIPP: Deine Logindaten gleichen deinen bestehenden Nutzerdaten, welche dir für Teams und den PCs zugeteilt wurden!
        </template>
        <template v-else-if="isRegisterActive">
          Erstelle deinen Account für derSchulhof!
        </template>
        <template v-else>
          Der Ort, um dich mit deiner Schule zu vernetzen<br>- ohne Pausenaufsicht
        </template>
      </span>
    </div>

    <img class="top-img" :class="{ 'login-register-clicked': isLoginActive || isRegisterActive }" src="../../assets/Login-Register-Select-TOP.png" alt="Bild">
    <img class="dots-svg" src="../../assets/Login-Register-Select-DOTS.svg" alt="Bild">
    <div class="buttons">
      <button
          id="login-button"
          @click="handleLogin"
      >
        {{ isLoginActive ? 'ZURÜCK' : 'LOGIN' }}
      </button>
      <button id="register-button" @click="handleRegister">Register</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// Interface für die Login-Response definieren
interface LoginResponse {
  token?: string
  user?: any
  error?: string
  message?: string
}

interface RegisterResponse {
  token?: string
  user?: any
  error?: string
  message?: string
}

const username = ref('')
const password = ref('')
const email = ref('')
const isLoginActive = ref(false)
const isRegisterActive = ref(false)
const loginResult = ref<LoginResponse | null>(null)
const registerResult = ref<RegisterResponse | null>(null)

const handleLogin = () => {
  isLoginActive.value = !isLoginActive.value
  loginResult.value = null
}

const handleRegister = () => {
  isRegisterActive.value = !isRegisterActive.value
  registerResult.value = null
}

// LOGIN - API COMMUNICATION
const handleLoginSubmit = async () => {
  try {
    const response = await fetch('http://192.168.2.137:3000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        password: password.value
      })
    })

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    loginResult.value = data

    if (response.ok) {
      console.log('Login erfolgreich!', data)
      // localStorage.setItem('token', data.token)
      // router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login fehler:', error)
    loginResult.value = { error: 'Verbindungsfehler' }
  }
}

// REGISTER - API COMMUNICATION
const handleRegisterSubmit = async () => {
  try {
    const response = await fetch('http://192.168.2.137:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`)
    }
    const data = await response.json()
    registerResult.value = data

    if (response.ok) {
      console.log('Login erfolgreich!', data)
      // localStorage.setItem('token', data.token)
      // router.push('/dashboard')
    }
  } catch (error) {
    console.error('Login fehler:', error)
    registerResult.value = { error: 'Verbindungsfehler' }
  }
}
</script>

<style scoped>
.container {
  position: relative;
  width: 100%;
  height: 100vh;
}

.top-img {
  width: 100%;
  height: 100%;
  object-fit: cover;

  transition: transform 1s ease-in-out;
}

.login-register-clicked {
  transform: translateY(-300px);
}

.text-block {
 position: absolute;
 top: 600px;
 left: 20px;
 z-index: 10;
}

.text-block h1 {
  margin: 0 0 10px 0;
  font-family: Arial;
  font-weight: 900;
}

.description {
  font-family: Arial;
  font-size: 14px;
  line-height: 1.5;

  color: #acacac;
  font-weight: lighter;
}

.buttons {
  position: absolute;
  bottom: 20px;
  left: 20px;
  z-index: 11;
  width: 300px;
  height: 100px;

  display: flex;
  align-content: center;
  align-items: center;
  justify-content: space-between;



  button {
    height: 40px;
    width: 130px;

    border-radius: 10px;

    border: none;
  }

  #login-button {
    background-color: #ec850c;
    font-weight: bolder;

    color: white;
  }

  #register-button {
    font-weight: bolder;
    border: 2px solid #ec850c;
    color: #ec850c;
  }
}

.dots-svg {
  position: absolute;
  bottom: 15px;
  right: 0px;
  z-index: 11;
  width: 40px;
  height: auto;

  opacity: .4;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .8s ease;
}

.fade-enter-from, .fade-leave-to {
  opacity: 0;
}

.login-inputs {
  opacity: 0;
  position: absolute;

  top: -240px;
  transform: translateX(-100px);
  overflow: hidden;

  transition: 1s all ease-in-out;

  input {
    padding: 10px;
    margin-bottom: 30px;
  }
}

.register-inputs {
  opacity: 0;
  position: absolute;

  top: -240px;
  transform: translateX(-200px);
  overflow: hidden;

  transition: 1s all ease-in-out;

  input {
    padding: 10px;
    margin-bottom: 30px;
  }
}

.active-login-inputs {
  opacity: 1;
  transform: translateX(0px);
  transition: 1s all ease-in-out;
}

.active-register-inputs {
  opacity: 1;
  transform: translateX(0px);
  transition: 1s all ease-in-out;
}

#login-button-form {
  background-color: #0062a6 !important;
  border: none;
  padding: 14px;

  font-weight: bolder;
  color: white;

  border-radius: 10px;
}
</style>
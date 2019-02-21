<template>
  <div id="app">
    <header>
      <div class="logo-area">
        <div class="logo-img">
          <img src="@/assets/sf_icon.svg" alt>
        </div>
        <div class="logo-text">
          <span class="darktext">?</span>
          <span class="redtext">sparql</span>
          <span class="darktext">form</span>
        </div>
      </div>
      <div class="menu-area">
        <!--
          <router-link to="/">Home</router-link>|
          <router-link to="/about">About</router-link>
        -->
        <router-link tag="div" to="/" class="menu-item">
          <a>home</a>
        </router-link>
        <router-link tag="div" to="/builder" class="menu-item">
          <a>builder</a>
        </router-link>
        <router-link tag="div" to="/help" class="menu-item">
          <a>info</a>
        </router-link>

        <!--
        <div id="home" class="menu-item">
          <router-link to="/">home</router-link>
        </div>
        <div id="builder" class="menu-item">
          <router-link to="/builder">builder</router-link>
        </div>
        <div id="about" class="menu-item">
          <router-link to="/about">about</router-link>
        </div>
        -->
      </div>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <div class="footer-stripes">
        <div class="parallelogram"></div>
        <div class="parallelogram"></div>
      </div>
      <div class="copyright">&copy;2019 Landon Todd Detwiler</div>
    </footer>
  </div>
</template>

<style>
:root {
  --primary: #707070;
  --darker: #505050;
  --accent: #cd0b0b;
  --light: #fff;
  --shadow: 0 1px 5px rgba(104, 104, 104, 0.8);
}

*,
*:before,
*:after {
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}

html,
body,
#app {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Montserrat", sans-serif;
  height: 100%;
  width: 100%;
}

#app {
  background: url(./assets/header-background.svg) no-repeat top left;
  background-size: 100% 150px;

  display: grid;
  grid-template-rows: 100px minmax(0, 1fr) 50px;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /*overflow: scroll;*/
}

/* Header */
header {
  display: grid;
  padding: 0;
  grid-template-columns: 43fr 57fr;
  box-sizing: border-box;
  height: 100px;
  width: 100%;
}

.logo-area {
  height: 100%;
  width: 100%;
  display: grid;
  place-items: center;
  grid-template-columns: 2fr 8fr;
}

.logo-img {
  padding-right: 10px;
  justify-self: end;
}

.logo-img > img {
  height: 40px;
}

.logo-text {
  justify-self: start;
  font-size: 2em;
  font-weight: bold;
}

.logo-text .redtext {
  color: var(--accent);
}

.logo-text .darktext {
  color: var(--primary);
}

.menu-area {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  place-items: center;
  padding: 0px 10%;
}

.menu-item {
  text-align: center;
  padding: 0 20px;
  transform: skew(-50deg);
}

.menu-item a {
  display: inline-block;
  color: var(--light);
  font-size: 2em;
  text-decoration: none;
  transform: skew(50deg);
}

.menu-item.router-link-exact-active {
  background-color: var(--light);
  color: var(--dark);

  /*border-radius: 0.5rem;*/
}

.menu-item.router-link-exact-active a {
  color: var(--dark);
}

main {
  box-sizing: border-box;
  height: 100%;
  width: 100%;
  /* padding: 15px 5%; */

}

/*
main > * {
  margin: 15px 5%;
}
*/

footer {
  /*
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  */

  box-sizing: border-box;
  width: 100%;
  height: 50px;
  padding: 0px 5%;
  font-size: larger;
  background-color: var(--primary);
  color: var(--light);
  display: grid;
  align-items: center;
  grid-template-areas: "copyright . stripes";
}

footer .footer-stripes {
  justify-self: end;
  grid-area: stripes;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 40px;
}

footer .copyright {
  justify-self: start;
  grid-area: copyright;
}

.parallelogram {
  width: 30px;
  height: 50px;
  transform: skew(-50deg);
  background: var(--light);
}
</style>

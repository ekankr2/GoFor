<template>
  <body>
    <div class="pictureContainer">
      <div class="clip clip1">
        <div class="menus menus1">
          <h3>Post Title One</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
            suscipit nulla. Donec feugiat tempus nisi, vitae tincidunt ante</p>
        </div>
      </div>
      <div class="clip clip2">
        <div class="menus menus2">
          <h3>Post Title One</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
            suscipit nulla. Donec feugiat tempus nisi, vitae tincidunt ante</p>
        </div>
      </div>
      <div class="clip clip3">
        <div class="menus menus3">
          <h3>Post Title One</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
            suscipit nulla. Donec feugiat tempus nisi, vitae tincidunt ante</p>
        </div>
      </div>

    </div>
  </body>
</template>

<script>


  export default {
    name: 'Home',

    components: {

    },
  }
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Quicksand:wght@300;400;500;600;700&display=swap');


body, html{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  max-height: 100vh;
  overflow: hidden;
}
body{
  background: #111;
}
/* pic container */
.pictureContainer{
  position: relative;
  width: 1000px;
  height: 600px;
  background: #222;
}

.pictureContainer .clip{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.5s;
}
/* background pic */
.pictureContainer .clip.clip1{
  background: url("../assets/walk.jpg");
  background-size: cover;
  clip-path: polygon(0 0, 55% 0, 20% 100%, 0% 100%);
}

.pictureContainer .clip.clip2{
  background: url("../assets/bike.jpg");
  background-size: cover;
  clip-path: polygon(55% 0, 100% 0, 45% 100%, 20% 100%);
}

.pictureContainer .clip.clip3{
  background: url("../assets/motorcycle.jpg");
  background-size: cover;
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 45% 100%);
}
/* hover effect */
.pictureContainer:hover .clip{
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
}

.pictureContainer .clip:hover{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);

}
/* contents */
.pictureContainer .clip .menus1{
  position: absolute;
  bottom: -100%;
  left: 0;
  width:55%;
  padding-top: 0;
  background: #fff;
  opacity: 1;
  transition: 0.5s;
}
.pictureContainer .clip .menus2{
  position: absolute;
  bottom: -100%;
  left: 0;
  width:55%;
  padding-top: 0;
  background: #fff;
  opacity: 1;
  transition: 0.5s;
}
.pictureContainer .clip .menus3{
  position: absolute;
  bottom: -100%;
  right: 0;
  width:55%;
  padding-top: 0;
  background: #fff;
  opacity: 1;
  transition: 0.5s;
}
.pictureContainer .clip:hover .menus{
  bottom: 0;
  opacity: 1;
}

</style>
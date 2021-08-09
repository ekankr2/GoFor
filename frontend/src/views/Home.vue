<template>
  <body>
    <div class="pictureContainer">
      <div class="clip clip1">
        <div class="content">
          <h2>Post Title One</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
            suscipit nulla. Donec feugiat tempus nisi, vitae tincidunt ante</p>
        </div>
      </div>
      <div class="clip clip2">
        <div class="content">
          <h2>Post Title One</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
            suscipit nulla. Donec feugiat tempus nisi, vitae tincidunt ante</p>
        </div>
      </div>
      <div class="clip clip3">
        <div class="content">
          <h2>Post Title One</h2>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse non
            suscipit nulla. Donec feugiat tempus nisi, vitae tincidunt ante</p>
        </div>
      </div>
      <div class="clip clip4">
        <div class="content">
          <h2>Post Title One</h2>
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

*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Quicksand', sans-serif;
}
body{
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: #111;
}

.pictureContainer{
  position: relative;
  width: 1000px;
  height: 700px;
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

.pictureContainer:hover .clip{
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 100% 100%);
}

.pictureContainer .clip:hover{
  clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
</style>
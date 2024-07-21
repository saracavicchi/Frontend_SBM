<script setup lang="ts"></script>

<template>
  <section aria-labelledby="past-events" id="eventi-conclusi">
    <h2 id="past-events">Eventi Conclusi</h2>
    <img class="line" alt="Line" src="@/assets/images/homepageImg/line-1.svg" />
    <ul>
      <li>
        <article>
          <img class="event-img" src="@/assets/images/homepageImg/profilo.jpg" alt="Festa 3" />
          <p><strong>Festa 3</strong> Venerdì 9 Maggio Stelle:4.7/5</p>
        </article>
      </li>
      <li>
        <article>
          <img class="event-img" src="@/assets/images/homepageImg/profilo.jpg" alt="Festa 4" />
          <p><strong>Festa 4</strong> Sabato 10 Maggio Stelle: 4.9/5</p>
        </article>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'PastEvents'
};
</script>

<style>
.hidden {
  display: none;
}

.eventi-conclusi {
  height: 251px;
  left: 801px;
  position: absolute;
  top: 655px;
  width: 601px;
}

.eventi-conclusi .overlap-2 {
  height: 251px;
  position: relative;
  width: 611px;
}

.eventi-conclusi .rectangle-2 {
  background-color: #ffffff40;
  border-radius: 20px;
  height: 251px;
  left: 0;
  position: absolute;
  top: 0;
  width: 597px;
}

.eventi-conclusi .line-2 {
  height: 1px;
  left: 4px;
  object-fit: cover;
  position: absolute;
  top: 60px;
  width: 588px;
}

.eventi-conclusi .text-wrapper-24 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 25px;
  font-weight: 800;
  left: 188px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 14px;
  width: 223px;
}

.eventi-conclusi .info-feste-in-2 {
  height: 133px;
  left: 25px;
  position: absolute;
  top: 86px;
  width: 586px;
}

.eventi-conclusi .foto-festa-3 {
  background-color: #d9d9d9;
  border-radius: 27.5px/28.33px;
  height: 57px;
  left: 0;
  position: absolute;
  top: 0;
  width: 55px;
}

.eventi-conclusi .foto-festa-4 {
  background-color: #d9d9d9;
  border-radius: 27.5px/28.33px;
  height: 57px;
  left: 0;
  position: absolute;
  top: 76px;
  width: 55px;
}

.eventi-conclusi .text-wrapper-25 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 423px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 91px;
  width: 151px;
}

.eventi-conclusi .text-wrapper-26 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 184px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 92px;
  width: 162px;
}

.eventi-conclusi .text-wrapper-27 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 66px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 91px;
  width: 68px;
}

.eventi-conclusi .text-wrapper-28 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 423px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
  width: 140px;
}

.eventi-conclusi .text-wrapper-29 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 184px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
  width: 167px;
}

.eventi-conclusi .text-wrapper-30 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 66px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
  width: 64px;
}

</style>

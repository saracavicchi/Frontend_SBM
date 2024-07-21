<script setup lang="ts"></script>

<template>
  <section aria-labelledby="upcoming-events" id="eventi-in-programma">
    <h2 id="upcoming-events">Eventi in programma</h2>
    <img class="line" alt="Line" src="@/assets/images/homepageImg/line-1.svg" />
    <ul>
      <li>
        <article>
          <img class="event-img" src="@/assets/images/homepageImg/profilo.jpg" alt="Festa 1" />
          <p><strong>Festa 1</strong> Venerdì 24 Maggio 7856 interessati</p>
        </article>
      </li>
      <li>
        <article>
          <img class="event-img" src="@/assets/images/homepageImg/profilo.jpg" alt="Festa 1" />
          <p><strong>Festa 2</strong> Sabato 25 Maggio 10984 interessati</p>
        </article>
      </li>
    </ul>
  </section>
</template>

<script>
export default {
  name: 'UpcomingEvents'
};
</script>


<style>
.eventi-in-programma {
  height: 232px;
  left: 798px;
  position: absolute;
  top: 400px;
  width: 601px;
}

.eventi-in-programma .overlap {
  background-color: #ffffff40;
  border-radius: 20px;
  height: 232px;
  position: relative;
  width: 599px;
}

.eventi-in-programma .text-wrapper-12 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 25px;
  font-weight: 800;
  left: 152px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 14px;
}

.eventi-in-programma .line {
  height: 1px;
  left: 16px;
  object-fit: cover;
  position: absolute;
  top: 66px;
  width: 573px;
}

.eventi-in-programma .info-feste-in {
  height: 129px;
  left: 22px;
  position: absolute;
  top: 77px;
  width: 576px;
}

.eventi-in-programma .foto-festa {
  background-color: #d9d9d9;
  border-radius: 27.5px;
  height: 55px;
  left: 0;
  position: absolute;
  top: 0;
  width: 55px;
}

.eventi-in-programma .foto-festa-2 {
  background-color: #d9d9d9;
  border-radius: 27.5px;
  height: 55px;
  left: 0;
  position: absolute;
  top: 74px;
  width: 55px;
}

.eventi-in-programma .text-wrapper-13 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 413px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 89px;
}

.eventi-in-programma .text-wrapper-14 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 184px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 89px;
}

.eventi-in-programma .text-wrapper-15 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 66px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 89px;
}

.eventi-in-programma .text-wrapper-16 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 423px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
}

.eventi-in-programma .text-wrapper-17 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 184px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
}

.eventi-in-programma .text-wrapper-18 {
  color: #ffffff;
  font-family: "Outfit", Helvetica;
  font-size: 20px;
  font-weight: 400;
  left: 66px;
  letter-spacing: 0;
  line-height: normal;
  position: absolute;
  top: 13px;
}

</style>

<template>
  <div class="section">
    <div class="container space-y-10">
      <div>
        <h1 class="section-title">Доставка и формат продаж</h1>
        <p class="section-subtitle">Розничные и оптовые заказы, надежная упаковка и доставка по Москве и России.</p>
      </div>

      <div class="grid gap-6 md:grid-cols-3">
        <div class="card card-hover p-6">
          <h3 class="text-lg font-semibold">Розничные и оптовые заказы</h3>
          <p class="section-subtitle">Оформить можно любую партию, включая заказы для частных клиентов без минимальной суммы заказа.</p>
        </div>
        <div class="card card-hover p-6">
          <h3 class="text-lg font-semibold">Доставка по Москве и России</h3>
          <p class="section-subtitle">Организуем отправку готовых заказов по Москве и регионам с учетом особенностей модели и упаковки.</p>
        </div>
        <div class="card card-hover p-6">
          <h3 class="text-lg font-semibold">Надежная упаковка</h3>
          <p class="section-subtitle">Перед отправкой товар аккуратно упаковывается, чтобы сохранить внешний вид и комплектность при перевозке.</p>
        </div>
      </div>

      <div class="card p-6 space-y-3">
        <h2 class="text-xl font-semibold">Условия заказа</h2>
        <p class="section-subtitle">
          Мы работаем как с розничными, так и с оптовыми заказами. Оформить можно любую партию, включая заказы для частных клиентов без минимальной суммы заказа. Обеспечиваем надёжную упаковку и организуем доставку по Москве и России.
        </p>
      </div>

      <div class="card p-6 space-y-4">
        <h2 class="text-xl font-semibold">Сроки</h2>
        <ul class="space-y-2 text-sm md:text-base" :style="{ color: 'var(--muted)' }">
          <li>Изготовление стандартного заказа занимает 3–5 рабочих дней.</li>
          <li>Срок изготовления крупных партий рассчитывается индивидуально в зависимости от объема и текущей загрузки.</li>
          <li>Срочные заказы обсуждаются отдельно.</li>
        </ul>
      </div>

      <div class="card p-6 space-y-4">
        <h2 class="text-xl font-semibold">Как оформить заказ</h2>
        <p class="section-subtitle">
          Если вам нужна консультация по материалам, срокам или стоимости, оставьте заявку через форму обратной связи. Мы подскажем по готовым моделям и индивидуальным проектам.
        </p>
        <RouterLink to="/contacts" class="btn btn-primary">Заказать консультацию</RouterLink>
      </div>
    </div>
  </div>
</template>

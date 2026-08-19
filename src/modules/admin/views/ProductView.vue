<template>
  <div class="bg-white px-5 py-2 rounded">
    <h1 class="text-3xl">
      Producto: <small class="text-blue-500">{{ values.title }}</small>
    </h1>
    <hr class="my-4" />
  </div>

  <form @submit="onSubmit" class="grid grid-cols-1 sm:grid-cols-2 bg-white px-5 gap-5">
    <div class="first-col">
      <!-- Primera parte del formulario -->
      <div class="mb-4">
        <label for="title" class="form-label">Título</label>
        <CustomInput v-model="title" :error="errors.title" />
      </div>

      <div class="mb-4">
        <label for="slug" class="form-label">Slug</label>
        <CustomInput v-model="slug" :error="errors.slug" />
      </div>

      <div class="mb-4">
        <label for="description" class="form-label">Descripción</label>
        <CustomTextarea v-model="description" :error="errors.description" />
      </div>

      <div class="flex flex-row gap-3">
        <div class="mb-4 flex-1">
          <label for="price" class="form-label">Precio</label>
          <CustomInput v-model.number="price" :error="errors.price" />
        </div>

        <div class="mb-4 flex-1">
          <label for="stock" class="form-label">Inventario</label>
          <CustomInput v-model.number="stock" :error="errors.stock" />
        </div>
      </div>

      <div class="mb-4">
        <label for="sizes" class="form-label">Tallas</label>
        <div class="flex">
          <button
            v-for="value in allSizes"
            @click.prevent="toggleSize(value)"
            :key="value"
            type="button"
            :class="[
              'p-2 rounded w-14 mr-2 flex-1',
              { 'bg-blue-500 text-white': hasSize(value), 'bg-blue-100': !hasSize(value) },
            ]"
          >
            {{ value }}
          </button>
        </div>
      </div>
    </div>

    <!-- Segunda columna -->
    <div class="first-col">
      <label for="stock" class="form-label">Imágenes</label>
      <!-- Row with scrollable horizontal -->
      <div class="flex p-2 overflow-x-auto space-x-8 w-full h-[265px] bg-gray-200 rounded">
        <div v-for="image in images" :key="image.value" class="flex-shrink-0">
          <img :src="image.value" alt="imagen" class="w-[250px] h-[250px] object-cover rounded" />
        </div>

        <div v-for="imageFile in imageFiles" :key="imageFile.name" class="flex-shrink-0">
          <img
            :src="temporalImage(imageFile)"
            alt="imagen"
            class="w-[250px] h-[250px] object-cover rounded"
          />
        </div>
      </div>
      <!-- Upload image -->
      <div class="col-span-2 my-2">
        <label for="image" class="form-label">Subir imagen</label>

        <div class="flex items-center gap-3">
          <label
            for="image"
            class="bg-white border border-gray-300 rounded px-4 py-2 cursor-pointer text-sm hover:bg-gray-100"
            >Subir imagenes</label
          >

          <input
            multiple
            type="file"
            id="image"
            class="hidden"
            accept="image/*"
            @change="onFileChanged"
          />
        </div>
      </div>

      <div class="mb-4">
        <label for="stock" class="form-label">Género</label>
        <select v-model="gender" v-bind="genderAttrs" class="form-control">
          <option value="">Seleccione</option>
          <option value="kid">Niño</option>
          <option value="women">Mujer</option>
          <option value="men">Hombre</option>
        </select>
        <span class="text-sm text-red-500">{{ errors.gender }}</span>
      </div>

      <!-- Botón para guardar -->
      <div class="my-4 text-right">
        <button
          :disabled="isPending"
          type="submit"
          class="disabled:bg-gray-300 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Guardar
        </button>
      </div>
    </div>
  </form>

  <!-- <div class="grid grid-cols-2">
    <pre class="bg-blue-200 p-2">
      {{ JSON.stringify(values, null, 2) }}
    </pre>
    <pre class="bg-green-200 p-2">
      {{ JSON.stringify(meta, null, 2) }}
    </pre>
    <div class="bg-red-200 p-2">
      {{ errors }}
    </div>
  </div> -->
</template>

<script src="./ProductView.ts" lang="ts"></script>

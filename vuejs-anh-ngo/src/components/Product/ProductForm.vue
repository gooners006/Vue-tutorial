<script setup lang="ts">
import { toTypedSchema } from '@vee-validate/yup';
import { ErrorMessage, Field, useForm } from 'vee-validate';
import { ref } from 'vue';
import { useToast } from 'vue-toastification';
import { number, object, string } from 'yup';

import {
  createProduct,
  updateProduct,
} from '@/services/modules/ProductService';

const { initialValues } = defineProps<{
  initialValues?: {
    id: number;
    title: string;
    description: string;
    price: number;
    discountPercentage: number;
    stock: number;
    brand: string;
    category: string;
    images: (string | undefined)[];
  };
}>();

const emit = defineEmits<{
  (e: 'toggleForm', status: boolean): void;
  (e: 'refreshData'): void;
}>();

const yupSchema = toTypedSchema(
  object({
    title: string().required(),
    description: string().required(),
    price: number().required(),
    discountPercentage: number().required(),
    stock: number().required(),
    brand: string().required(),
    category: string().required(),
  }),
);

// ---DATA---
const formTitle = initialValues?.id ? 'Edit Item' : 'Add Item';
const { defineInputBinds, handleSubmit } = useForm({
  validationSchema: yupSchema,
  initialValues: initialValues?.id ? initialValues : {},
});
const description = defineInputBinds('description');
const toast = useToast();

const isLoading = ref<boolean>(true);
const errorMessage = ref<string>('');
const uploadedImages = ref<(string | undefined)[]>(
  initialValues?.id ? [...initialValues.images] : [],
);

// ---METHODS---
const onSubmit = handleSubmit(async (values) => {
  isLoading.value = true;
  try {
    if (!initialValues?.id) {
      await createProduct({
        ...values,
        id: Date.now(),
        thumbnail: uploadedImages.value?.[0] || '',
        images: uploadedImages.value,
        rating: Number((Math.random() * 5).toFixed(2)),
      });
    } else {
      await updateProduct({
        ...values,
        id: initialValues.id,
        thumbnail: uploadedImages.value?.[0] || '',
        images: uploadedImages.value,
      });
    }

    isLoading.value = false;
    toast.success('Success!!!');
    emit('toggleForm', false);
    emit('refreshData');
  } catch (error) {
    isLoading.value = false;
    if (error instanceof Error) {
      errorMessage.value = (error.cause as { message: string }).message;
    } else {
      errorMessage.value = 'Unknown error';
      throw error;
    }
    toast.error(errorMessage.value);
  }
});

const uploadFile = (event: Event) => {
  const images = (event.target as HTMLInputElement).files;
  if (images !== null) {
    for (const image of images) {
      const reader = new FileReader();
      reader.readAsDataURL(image);
      reader.onload = () => {
        if (reader.result && uploadedImages.value.length < 6) {
          uploadedImages.value.push(reader.result as string);
        }
      };
    }
  }
};

const removeImage = (index: number) => {
  uploadedImages.value.splice(index, 1);
};
</script>

<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="emit('toggleForm', false)">&times;</span>
      <form @submit="onSubmit">
        <h2>{{ formTitle }}</h2>
        <div class="form-content">
          <div class="text-section">
            <div>
              <Field type="text" name="title" placeholder="Title" />
              <ErrorMessage name="title" class="error-message" />

              <Field type="text" name="price" placeholder="Price" />
              <ErrorMessage name="price" class="error-message" />

              <Field
                type="text"
                name="discountPercentage"
                placeholder="Discount Percentage"
              />
              <ErrorMessage name="discountPercentage" class="error-message" />

              <Field type="text" name="stock" placeholder="Stock" />
              <ErrorMessage name="stock" class="error-message" />

              <Field type="text" name="brand" placeholder="Brand" />
              <ErrorMessage name="brand" class="error-message" />

              <Field type="text" name="category" placeholder="Category" />
              <ErrorMessage name="category" class="error-message" />
            </div>
            <p>Description</p>
            <div>
              <textarea
                rows="6"
                maxlength="500"
                name="description"
                v-bind="description"
              ></textarea>
              <ErrorMessage name="description" class="error-message" />
            </div>
          </div>
          <div class="image-section">
            <input
              type="file"
              @change="uploadFile"
              multiple
              accept="image/*"
            /><br />
            <p>
              Upload Images (first image will be selected as thumbnail, maximum
              6 images)
            </p>
            <div
              v-for="(image, index) in uploadedImages"
              :key="index"
              class="image-preview"
            >
              <img :src="image" alt="Image preview" />
              <span class="image-close" @click="removeImage(index)"
                >&times;</span
              >
            </div>
          </div>
        </div>
        <button type="submit" class="submit-button">Confirm</button>
      </form>
    </div>
  </div>
</template>

<style scoped>
.modal {
  position: fixed;
  z-index: 8;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}
.modal-content {
  width: 60%;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  position: absolute;
}

h2 {
  font-weight: 400;
  color: #999;
  margin-bottom: 20px;
}

p {
  color: #666;
  display: block;
  padding: 0 0 5px;
}

form {
  padding: 25px;
  margin: 25px;
  box-shadow: 0 2px 5px #f5f5f5;
  background: #eee;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
  line-height: 1;
}
.close:hover,
.close:focus {
  color: #04aa6d;
  text-decoration: none;
  cursor: pointer;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #04aa6d;
  outline: none;
}

input:not(:first-child) {
  margin-top: 20px;
}

textarea {
  resize: none;
}
form .submit-button {
  width: 100%;
  padding: 10px;
  border: none;
  background: #04aa6d;
  font-size: 16px;
  font-weight: 400;
  color: #fff;
  margin-top: 20px;
}
form .submit-button:hover {
  background: #04aa6dad;
  cursor: pointer;
}

.error-message {
  color: red;
}

.form-content {
  display: flex;
}

.form-content > div {
  margin: 0 5px;
}

.text-section {
  width: 50%;
}
.image-section {
  width: 50%;
}

.image-preview {
  height: 100px;
  display: inline-block;
  margin: 5px 5px 0 0;
  position: relative;
}

.image-preview img {
  height: 100%;
}

.image-close {
  font-size: 1.5em;
  cursor: pointer;
  color: white;
  text-shadow:
    2px 0px 0 #000,
    -2px 0px 0 #000,
    0px 2px 0 #000,
    0px -2px 0 #000;
  position: absolute;
  line-height: 12px;
  right: 0;
}
</style>

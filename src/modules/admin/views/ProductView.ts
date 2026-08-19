import { getProductById, createUpdateProductAction } from '@/modules/products/actions';
import { useMutation, useQuery } from '@tanstack/vue-query';
import { useForm, useFieldArray } from 'vee-validate';
import { defineComponent, watchEffect, watch, ref } from 'vue';
import * as yup from 'yup';
import { useRouter } from 'vue-router';
import CustomInput from '@/modules/common/components/CustomInput.vue';
import CustomTextarea from '@/modules/common/components/CustomTextarea.vue';
import { useToast } from 'vue-toastification';
const validationSchema = yup.object({
  title: yup.string().required().min(3).max(100),
  slug: yup.string().required(),
  description: yup.string().required(),
  price: yup.number().required(),
  stock: yup.number().required().min(1),
  gender: yup.string().required().oneOf(['men', 'women', 'kid']),
});

export default defineComponent({
  components: {
    CustomInput,
    CustomTextarea,
  },
  props: {
    productId: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    const toast = useToast();

    const {
      data: product,
      isError,
      isLoading,
      refetch,
    } = useQuery({
      queryKey: ['product', props.productId],
      queryFn: () => getProductById(props.productId),
      retry: false,
    });

    const {
      mutate,
      isPending,
      isSuccess: isUpdateSuccess,
      data: updatedProduct,
    } = useMutation({
      mutationFn: createUpdateProductAction,
    });

    const { values, defineField, errors, handleSubmit, resetForm, meta } = useForm({
      validationSchema,
      // initialValues: product.value,
    });

    const [title, titleAttrs] = defineField('title');
    const [slug, slugAttrs] = defineField('slug');
    const [description, descriptionAttrs] = defineField('description');
    const [price, priceAttrs] = defineField('price');
    const [stock, stockAttrs] = defineField('stock');
    const [gender, genderAttrs] = defineField('gender');

    const { fields: images } = useFieldArray<string>('images');
    const imageFiles = ref<File[]>([]);
    const { fields: sizes, remove: removeSize, push: pushSize } = useFieldArray<string>('sizes');

    const onSubmit = handleSubmit(async (values) => {
      // const product = await createUpdateProduct(values);
      // console.log('Product created/updated:', product);
      const formValues = {
        ...values,
        images: [...values.images, ...imageFiles.value],
      };
      mutate(formValues);
    });

    const toggleSize = (size: string) => {
      const currentSize = sizes.value.map((s) => s.value);
      const hasSize = currentSize.includes(size);
      if (hasSize) {
        removeSize(currentSize.indexOf(size));
      } else {
        pushSize(size);
      }
    };

    const onFileChanged = (event: Event) => {
      const target = event.target as HTMLInputElement;
      const fileList = target.files;
      if (!fileList) return;
      if (fileList.length === 0) return;

      for (const image of fileList) {
        imageFiles.value.push(image);
      }

      console.log(imageFiles.value);
    };

    watchEffect(() => {
      if (isError.value && !isLoading.value) {
        router.replace('/admin/products');
      }
    });

    watch(
      product,
      () => {
        if (!product) return;

        resetForm({
          values: product.value,
        });
      },
      {
        deep: true,
        immediate: true,
      },
    );

    watch(isUpdateSuccess, (value) => {
      if (!value) return;

      toast.success('Producto actualizado con éxito');
      router.replace(`/admin/products/${updatedProduct.value!.id}`);

      resetForm({
        values: updatedProduct.value,
      });
      imageFiles.value = [];
    });

    watch(
      () => props.productId,
      () => {
        refetch();
      },
    );

    return {
      //Properties
      errors,
      values,
      title,
      titleAttrs,
      slug,
      slugAttrs,
      description,
      descriptionAttrs,
      price,
      priceAttrs,
      stock,
      stockAttrs,
      gender,
      genderAttrs,
      handleSubmit,
      images,
      sizes,
      meta,
      isPending,
      imageFiles,
      onFileChanged,
      //Getters
      allSizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],

      //State

      //Actions
      onSubmit,
      toggleSize,

      hasSize: (size: string) => {
        const currentSizes = sizes.value.map((s) => s.value);
        return currentSizes.includes(size);
      },
      temporalImage: (image: File) => {
        return URL.createObjectURL(image);
      },
    };
  },
});

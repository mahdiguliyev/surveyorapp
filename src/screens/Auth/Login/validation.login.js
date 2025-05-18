import * as Yup from 'yup';

export const userValidationSchema = Yup.object({
  userName: Yup.string().required('İstifadəçi adı boş buraxıla bilməz.'),
  password: Yup.string()
    .required('Şifrə boş buraxıla bilməz.')
    .min(6, 'Şifrə ən az 6 simvol olmalıdır.'),
});

export const finCodeValidationSchema = Yup.object({
  finCode: Yup.string()
    .required('FİN kod boş buraxıla bilməz.')
    .min(5, 'FİN kod ən azı 5 simvol olmalıdır.')
    .max(7, 'FİN kod ən çoxu 7 simvol olmalıdır.')
    .matches(
      /^[a-zA-Z0-9]+$/,
      'FİN kod yalnız uyğun simvollardan ibarət olmalıdır.',
    ),
  password: Yup.string()
    .required('Şifrə boş buraxıla bilməz.')
    .min(6, 'Şifrə ən az 6 simvol olmalıdır.'),
});

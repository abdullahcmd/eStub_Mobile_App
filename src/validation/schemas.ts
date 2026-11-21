import * as Yup from 'yup';
import {config} from '@/constants/config';

/**
 * Yup schemas for every Formik form. Keep copy (error messages) here so that
 * forms stay free of validation strings.
 */

export const companySchema = Yup.object({
  domain: Yup.string()
    .trim()
    .required('Enter your company domain')
    .matches(
      /^(?!-)[a-z0-9-]+(\.[a-z0-9-]+)*\.[a-z]{2,}$/i,
      'Enter a valid domain, e.g. company.estubs.com',
    ),
  firstName: Yup.string().trim().required('First name is required'),
  lastName: Yup.string().trim().required('Last name is required'),
});
export type CompanyFormValues = Yup.InferType<typeof companySchema>;

export const employeeIdSchema = Yup.object({
  employeeId: Yup.string()
    .trim()
    .required('Employee ID is required')
    .matches(/^\d+$/, 'Employee ID can only contain numbers')
    .min(4, 'Employee ID is too short')
    .max(12, 'Employee ID is too long'),
});
export type EmployeeIdFormValues = Yup.InferType<typeof employeeIdSchema>;

export const pinSchema = Yup.object({
  pin: Yup.string()
    .required('Enter the code we sent you')
    .matches(
      new RegExp(`^\\d{${config.PIN_LENGTH}}$`),
      `Enter the ${config.PIN_LENGTH}-digit code`,
    ),
});
export type PinFormValues = Yup.InferType<typeof pinSchema>;

export const passwordSchema = Yup.object({
  password: Yup.string()
    .required('Password is required')
    .min(8, 'Password must be at least 8 characters'),
});
export type PasswordFormValues = Yup.InferType<typeof passwordSchema>;

export const dateRangeSchema = Yup.object({
  startDate: Yup.date().typeError('Pick a start date').required('Pick a start date'),
  endDate: Yup.date()
    .typeError('Pick an end date')
    .required('Pick an end date')
    .min(Yup.ref('startDate'), 'End date must be after the start date'),
});
export type DateRangeFormValues = Yup.InferType<typeof dateRangeSchema>;

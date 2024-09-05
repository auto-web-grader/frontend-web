import get from 'lodash.get';
import { Controller, RegisterOptions, useFormContext } from 'react-hook-form';
import { FaCheck } from 'react-icons/fa6';
import { FiChevronDown } from 'react-icons/fi';
import Select, { components, MultiValue, StylesConfig } from 'react-select';

import HelperText from '@/components/form/HelperText';
import Typography from '@/components/Typography';
import clsxm from '@/lib/clsxm';

export type SelectInputProps = {
  id: string;
  label?: string;
  helperText?: string;
  hideError?: boolean;
  validation?: RegisterOptions;
  disabled?: boolean;
  options: { value: string | number; label: string }[];
  isMulti?: boolean;
  handleChange?: <T extends string>(selectedOptions: T) => void;
  reactSelectProps?: React.ComponentPropsWithoutRef<typeof Select>;
} & React.ComponentPropsWithoutRef<'select'>;

export default function SelectInput({
  disabled,
  id,
  isMulti = false,
  options,
  label,
  helperText,
  validation,
  // readOnly = false,
  defaultValue,
  placeholder = '',
  handleChange, // ...rest
}: SelectInputProps) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = get(errors, id);

  return (
    <div className='w-full space-y-1.5 rounded-md'>
      {label && (
        <label htmlFor={id}>
          <Typography className=' text-neutral-100 font-medium text-sm'>
            {label}{' '}
            {validation?.required && (
              <span className='text-danger-main'>*</span>
            )}
          </Typography>
        </label>
      )}

      <div className={clsxm('relative mt-1 rounded-md')}>
        <Controller
          name={id}
          control={control}
          rules={validation}
          render={({ field }) => {
            const atm = {
              BCA: '1',
              Mandiri: '2',
              Gopay: '3',
              Shopeepay: '4',
            };

            // value defaultValue
            const valueSelectInput = [
              'BCA',
              'Mandiri',
              'Gopay',
              'Shopeepay',
            ].some((x) => defaultValue === x)
              ? atm[defaultValue as keyof typeof atm]
              : defaultValue;

            const styles = error ? errorStyles : customStyles;
            return (
              <Select
                {...field}
                value={
                  //? null is needed so if the selected value is not found in the options, it will clear the value
                  typeof field.value === 'object'
                    ? field.value
                    : defaultValue
                    ? field.onChange({
                        label: defaultValue,
                        value: valueSelectInput,
                      })
                    : null
                }
                classNamePrefix='select'
                className='basic-single'
                onChange={(selectedOptions) => {
                  isMulti
                    ? field.onChange(
                        (
                          selectedOptions as MultiValue<
                            (typeof options)[number]
                          >
                        ).map((option) => option?.value ?? ''),
                      )
                    : field.onChange(selectedOptions);
                  handleChange?.(selectedOptions.value);
                }}
                isDisabled={disabled}
                isClearable
                closeMenuOnSelect={!isMulti}
                placeholder={placeholder}
                options={options}
                styles={styles}
                // defaultValue={options}
                components={{
                  Option: (props) => (
                    <components.Option {...props}>
                      <div className='w-full flex flex-row gap-2.5 justify-start items-center'>
                        {props.isSelected ? (
                          <>
                            {iconForOption(props.label, props.isSelected)}
                            {props.label}
                          </>
                        ) : (
                          <div className='pl-7'>
                            <span style={{ display: 'none' }}>
                              {iconForOption(props.label, props.isSelected)}
                            </span>
                            {props.label}
                          </div>
                        )}
                      </div>
                    </components.Option>
                  ),
                  IndicatorSeparator: () => null,
                  DropdownIndicator: (props) => (
                    <components.DropdownIndicator {...props}>
                      <FiChevronDown className='text-xl' />
                    </components.DropdownIndicator>
                  ),
                  // ClearIndicator: (props) => (
                  //   <components.ClearIndicator {...props}>
                  //     <FiX className='mr-0.5 text-lg text-neutral-30 hover:text-neutral-50' />
                  //   </components.ClearIndicator>
                  // ),
                  // MultiValueRemove: (props) => (
                  //   <components.MultiValueRemove {...props}>
                  //     <FiX size={16} />
                  //   </components.MultiValueRemove>
                  // ),
                }}
              />
            );
          }}
        />
        <div className='mt-1'>
          {helperText && (
            <Typography
              variant='h6'
              font='poppins'
              color='secondary'
              className='!leading-tight'
            >
              {helperText}
            </Typography>
          )}
          {error && (
            <Typography
              variant='c'
              className='!leading-tight text-danger-main text-sm'
            >
              {error?.message?.toString()}
            </Typography>
          )}
        </div>
      </div>

      {!error && helperText && <HelperText>{helperText}</HelperText>}
    </div>
  );
}
const errorStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: '2px solid red',
    boxShadow: 'none',
    '&:focus': {
      border: '2px solid red',
    },
    '&:hover': {
      border: '2px solid red',
    },
    '*': {
      boxShadow: 'none !important',
    },
    background: '#FEF1F1',
    padding: '0.5rem 0.75rem',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
  }),
  input: (styles) => ({
    ...styles,
    padding: 0,
    margin: 0,
    caretColor: '#6ac0f5',
    color: '#1F201d',
    '::placeholder': {
      color: '#5a5d56',
    },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    '&>div': {
      padding: 0,
    },
  }),

  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#878787',
    '&:hover': {
      color: '#878787',
    },
  }),
  option: (styles, state) => ({
    ...styles,
    color: 'black',
    background: state.isSelected ? '#D1D5DB' : 'white',
    ':hover': {
      background: '#E5E7EB',
    },
  }),
};

const customStyles: StylesConfig = {
  control: (styles) => ({
    ...styles,
    border: '1px solid #E4E7EB',
    borderRadius: '0.375rem',
    boxShadow: 'none',
    transition: 'none',
    '&:focus-within': {
      border: '2px solid #3c89d6',
    },
    '*': {
      boxShadow: 'none !important',
    },
    background: '#eeeee',
    padding: '0.625rem',
  }),
  valueContainer: (styles) => ({
    ...styles,
    padding: 0,
    gap: '0.5rem',
  }),
  input: (styles) => ({
    ...styles,
    padding: 0,
    margin: 0,
    caretColor: '#6ac0f5',
    color: '#1F201d',
    '::placeholder': {
      color: '#5a5d56',
    },
  }),
  indicatorsContainer: (styles) => ({
    ...styles,
    '&>div': {
      padding: 0,
    },
  }),

  dropdownIndicator: (styles) => ({
    ...styles,
    color: '#878787',
    '&:hover': {
      color: '#878787',
    },
  }),
  option: (styles, state) => ({
    ...styles,
    color: state.isSelected ? '#2F5FA2' : 'black',
    background: state.isSelected ? '#daeffc' : 'white',
    ':hover': {
      cursor: 'pointer',
      background: '#D7E3F3',
      color: '#2F5FA2',
    },
  }),
  multiValue: (styles) => ({
    ...styles,
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem',
    background: '#daeffc',
    padding: '0.25rem 0.75rem',
    margin: 0,
  }),
  multiValueLabel: (styles) => ({
    ...styles,
    color: '#296a91',
    padding: 0,
    paddingLeft: 0,
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    color: '#296a91',
    padding: 0,
    paddingLeft: '0.5rem',
    '&:hover': {
      color: '#296a91',
      backgroundColor: 'transparent',
    },
  }),
};

const iconForOption = (label: string, isSelected: boolean) => {
  if (isSelected) {
    return <FaCheck />;
  }
  return null;
};

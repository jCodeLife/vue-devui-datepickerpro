import type { ValidateError, ValidateFieldsError } from 'async-validator';
import type { Emitter } from 'mitt';
import type { PropType, ExtractPropTypes, InjectionKey } from 'vue';
import { FormItemContext, FormRuleItem, FormValidateCallback, FormValidateResult } from './components/form-item/form-item-types';

export type Layout = 'horizontal' | 'vertical';
export type LabelSize = 'sm' | 'md' | 'lg';
export type LabelAlign = 'start' | 'center' | 'end';
export type FormData = Record<string, any>;

export type FormRules = Partial<Record<string, Array<FormRuleItem>>>;
export interface ValidateFailure {
  errors: ValidateError[] | null;
  fields: ValidateFieldsError;
}

export const formProps = {
  data: {
    type: Object as PropType<FormData>,
    default: () => ({}),
  },
  layout: {
    type: String as PropType<Layout>,
    default: 'horizontal',
  },
  labelSize: {
    type: String as PropType<LabelSize>,
    default: 'md',
  },
  labelAlign: {
    type: String as PropType<LabelAlign>,
    default: 'start',
  },
  rules: {
    type: Object as PropType<FormRules>,
  },
  messageShowType: {
    type: String as PropType<'popover' | 'text' | 'toast' | 'none'>,
    default: 'popover',
  },
} as const;

export const dFormEvents = {
  addField: 'd.form.addField',
  removeField: 'd.form.removeField',
} as const;

export const dFormItemEvents = {
  blur: 'd.form.blur',
  change: 'd.form.change',
  input: 'd.form.input',
} as const;

export interface IFormLabel {
  layout: Layout;
  labelSize: LabelSize;
  labelAlign: LabelAlign;
}

export interface FormContext {
  formData: any;
  labelData: IFormLabel;
  formMitt: Emitter<any>;
  rules: any;
  messageShowType: string;
  addItemContext: (field: FormItemContext) => void;
  removeItemContext: (field: FormItemContext) => void;
}

export interface UseFieldCollection {
  itemContexts: FormItemContext[];
  addItemContext: (field: FormItemContext) => void;
  removeItemContext: (field: FormItemContext) => void;
}

export interface UseFormValidation {
  validate: (callback?: FormValidateCallback) => FormValidateResult;
  validateFields: (fields: string[], callback: any) => FormValidateResult;
}

export const FORM_TOKEN: InjectionKey<FormContext> = Symbol('dForm');

export interface IFormItem {
  dHasFeedback: boolean;
  prop: string;
  formItemMitt: Emitter<any>;
  resetField(): void;
}

export interface IFormControl {
  feedbackStatus: string;
  extraInfo: string;
  formItemMitt: Emitter<any>;
  resetField(): void;
}

export type FormProps = ExtractPropTypes<typeof formProps>;

export interface IValidators {
  required: boolean;
  minlength: number;
  maxlength: number;
  min: number;
  max: number;
  requiredTrue: boolean;
  email: boolean;
  pattern: RegExp;
  whiteSpace: boolean;
}

const Validators: IValidators = {
  required: false,
  minlength: 0,
  maxlength: 0,
  min: 0,
  max: 0,
  requiredTrue: false,
  email: false,
  pattern: undefined,
  whiteSpace: false,
};

export const dDefaultValidators = {
  required: Validators.required, // 配置不能为空限制，rule中使用：{ required: true }
  minlength: Validators.minlength, // 配置最小长度限制，rule中使用：{ minlength: 5 }
  maxlength: Validators.maxlength, // 配置最大长度限制，rule中使用：{ maxlength: 128 }
  min: Validators.min, // 配置最小值限制，rule中使用：{ min: 0 }
  max: Validators.max, // 配置最大值限制，rule中使用：{ max: 100 }
  requiredTrue: Validators.requiredTrue, // 配置需要为true，rule中使用：{ requiredTrue: true }
  email: Validators.email, // 配置邮箱校验，rule中使用：{ email: true }
  pattern: Validators.pattern, // 配置正则校验，rule中使用：{ pattern: RegExp }
  whitespace: Validators.whiteSpace, // 配置输入不能全为空格限制，rule中使用：{ whitespace: true }
};

export type positionType =
  | 'top'
  | 'right'
  | 'bottom'
  | 'left'
  | 'left-top'
  | 'left-bottom'
  | 'top-left'
  | 'top-right'
  | 'right-top'
  | 'right-bottom'
  | 'bottom-left'
  | 'bottom-right';

export interface DValidateResult {
  errors: any;
  fields: any;
}

export interface DFormValidateSubmitData {
  callback(valid: boolean, result: DValidateResult): void;
}

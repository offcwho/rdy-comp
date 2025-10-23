
# Ready Components

## Ready components to create your React App!
## Usage/Examples RdyInput

```javascript
    <Input
        id="email"
        label="E-mail"
        type="email"
        rounded="md"
        bordered={{
          onFocus: 'green',
          onBlur: 'blue',
        }}
    />
```

### Usage/Expample with react-hook-form

```javascript
    <Input
        {...register('email')} //add attr register from useForm() react-hook-form
        id="email"
        label="E-mail"
        type="email"
        rounded="md"
        bordered={{
          onFocus: 'green',
          onBlur: 'blue',
        }}
    />
```

### `RdyInput Props`

| Prop          | Type    |  Usage                       |
| --------------| --------|-----------------------------------------|
| type          | `type?: "text" / "password" / "email" / "number" / "search"` | `type="text"`                    |
| placeholder   | `placeholder?: string / ""`                                  | `placeholder="Введите данные"`   |
| className     | `className?: string`                                         | `className="inputClass"`         |
| id            | `id: string`                                                 | `id="name"`                      |
| label         | `label?: string`                                             | `label="Label title"`            |
| error         | `error?: string`                                             | `error="Value is must required"` |`
| bordered      | `onFocus?: string, onBlur?: string`                          | `onFocus="red"`                  |
|               |                                                              | `onBlur="white"`                 |
| rounded       | `rounded?: "none" / "sm" / "md" / "lg" / "xl" / "2xl" / "3xl" / "full" / boolean`| `rounded="lg"`|
| backgroundColor      | `backgroundColor?:    `                   |                                               |
|               | ` onFocus?: string    `                                                      |`onFocus="white"`                 
|               |  ` onBlur?: string  `                                                        | `onBlur="red"`    |
| value         | `value?: string` | `value={value}` //with react useState() |
| onChange      | `onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void` | `onChange={(e) => setValue(e.targe.value)}` |
| ref           | `ref?: React.Ref<HTMLInputElement>` | `ref={ref}` |
| ...props      |                                               | `{...register('name')}` // with react-hook-form



## Usage/Examples RdySelect


```javascript
    <CustomSelect
        searchable //Добавить поиск
        multiple //Возможность выбора несколько опций
        clearable //Кнопка стирания
        value={value} //use state
        onChange={setValue} //use state
        placeholder="Выберите фрукт" //placeholder
    >
        <CustomSelectOption 
            value="apple" //value
            label="Яблоко" //label
            disabled //disabled
        >Яблоко</CustomSelectOption>
        <CustomSelectOption value="banana" label="Банан" >Банан</CustomSelectOption>
        <CustomSelectOption value="orange" label="Апельсин" >Апельсин</CustomSelectOption>
        <CustomSelectOption value="grape" label="Виноград" >Виноград</CustomSelectOption>
        <CustomSelectOption value="mango" label="Манго" >Манго</CustomSelectOption>
    </CustomSelect>
```


### How to useage RdySelect component with react-hook-form

```javascript
    <Controller
        name="select"
        control={control}
        render={({ field }) => (
            <CustomSelect
                {...field}
                searchable
                clearable
                placeholder="Выберите фрукт"
            >
                <CustomSelectOption value="apple" label="Яблоко" disabled>Яблоко</CustomSelectOption>
                <CustomSelectOption value="banana" label="Банан" >Банан</CustomSelectOption>
                <CustomSelectOption value="orange" label="Апельсин" >Апельсин</CustomSelectOption>
                <CustomSelectOption value="grape" label="Виноград" >Виноград</CustomSelectOption>
                <CustomSelectOption value="mango" label="Манго" >Манго</CustomSelectOption>
            </CustomSelect>
        )}
    />
```


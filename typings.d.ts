type FormDataCustom = {
    [key: string]: FormItemCustom
}
type FormItemCustom = {
    touchedByUser: boolean,
    error: boolean,
    value: string
    validationFunc: (value: string) => boolean
}
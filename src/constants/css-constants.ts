const CHECKBOX_COLORS = [
    'checkbox-yellow', 'checkbox-orange', 'checkbox-lime', 'checkbox-teal', 'checkbox-cyan', 'checkbox-blue', 'checkbox-indigo', 'checkbox-pink',
]

const checkboxColorsLength = CHECKBOX_COLORS.length

export function checkboxColorsMapper(char: string) {
    const charcode = char.charCodeAt(0)
    return CHECKBOX_COLORS[charcode % checkboxColorsLength]
}
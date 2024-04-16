export function translateCategoryName(category: string) {
    switch (category) {
        case "Cervene-vina":
            return "Červené vína";
        case "Biele-vina":
            return "Biele vína";
        case "Ruzove-vina":
            return "Ružové vína";
        case "all":
            return "všetky produkty"
        default:
            return "Unknown Category";
    }
}
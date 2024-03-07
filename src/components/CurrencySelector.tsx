// import { Button } from "./ui/button";
// import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

// type Props = {
//     onChange: (value: string) => void;
//     currency: string;
// }

// const CURRENCY = [
//     {
//         label: "USD",
//         value: "usd",
//     },
//     {
//         label: "EUR",
//         value: "EUR",
//     },
//     {
//         label: "JPY",
//         value: "jpy",
//     },
//     {
//         label: "GBP",
//         value: "gbp",
//     },
//     {
//         label: "CNY",
//         value: "cny",
//     },
//     {
//         label: "AUD",
//         value: "aud",
//     },
//     {
//         label: "GBP",
//         value: "gbp",
//     },
// ]

// export default function SortOptionDropdown({ sortOption, onChange }: Props) {
//     const selectedSortLabel = CURRENCY.find((option) => option.value === sortOption)?.label || SORT_OPTIONS[0].label;
//     return (
//         <DropdownMenu>
//             <DropdownMenuTrigger className="cursor-pointer" >
//                 <Button variant="outline" className="w-full">Sort by: {selectedSortLabel}</Button>
//             </DropdownMenuTrigger>
//             <DropdownMenuContent>
//                 {SORT_OPTIONS.map((option, index) => (
//                     <DropdownMenuItem
//                         className="cursor-pointer"
//                         onClick={() => onChange(option.value)}
//                         key={index}
//                     >
//                         {option.label}
//                     </DropdownMenuItem>
//                 ))}
//             </DropdownMenuContent>
//         </DropdownMenu>
//     )
// }
export enum ButtonType {
    "normal", "danger", "primary", "secondary", "success"
}


function getButtonColors(btype: ButtonType) {
    if (btype === ButtonType.normal) {
        return "bg-amber-100 hover:bg-amber-200 active:bg-amber-400"
    } else if (btype === ButtonType.danger) {
        return "bg-red-100 hover:bg-red-200 active:bg-red-400"
    } else if (btype === ButtonType.primary) {
        return "bg-blue-100 hover:bg-blue-200 active:bg-blue-400"
    } else if (btype === ButtonType.success) {
        return "bg-green-100 hover:bg-green-200 active:bg-green-400"
    }
}


export default function Button(props: { text: string, size?: number, type: ButtonType }) {


    const buttonColor = getButtonColors(props.type)


    return (
        <>
            <button
                className={"transition-all text-center duration-75 ease-in p-2 rounded-xl ring-offset-2 ring-offset-slate-50 active:ring-2 ring-blue-300 "
                    + buttonColor
                }>
                {props.text}
            </button>
        </>
    )
}
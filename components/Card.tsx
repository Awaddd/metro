import { Zap } from "lucide-react"

type Props = {

}

export default function ({ }: Props) {
    return (
        <div className="w-full min-h-full p-6 bg-primary border shadow-xs rounded-lg">
            <div className="flex items-center gap-4">
                <Zap size="48" className="stroke-primary-foreground" />
                <h1 className="text-primary-foreground text-4xl font-black">Did you know?</h1>
            </div>
            <p className="mt-4 text-primary-foreground/80 text-lg">A whopping <span className="font-black">73%</span> of all stops lead to an arrest</p>
        </div>
    )
}

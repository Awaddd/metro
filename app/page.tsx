export default function Home() {
    return (
        <div className="min-h-full flex flex-grow flex-col items-start space-y-4 p-4">
            <section className="w-full flex flex-col sm:flex-row gap-4">
                <Panel />
                <Panel />
                <Panel />
            </section>

            <section className="w-full flex flex-col xl:flex-row gap-4">
                <Card />
                <Card />
            </section>

            <section className="w-full flex flex-col xl:flex-row gap-4">
                <Card />
                <Card />
            </section>
        </div>
    );
}

function Panel() {
    return (
        <div className="w-full h-36 bg-primary/50 rounded-lg"></div>
    )
}

function Card() {
    return (
        <div className="w-full h-96 bg-primary/50 rounded-lg"></div>
    )
}
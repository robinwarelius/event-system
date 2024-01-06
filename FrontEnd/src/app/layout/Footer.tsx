export default function Footer (){

    const today = new Date();
    const dateString = today.toLocaleDateString('sv-SE', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });

    return (
    <>
    <footer className="mt-auto py-3">
        <div className="container">
            <p>Calcifer | {dateString}</p>
        </div>
    </footer>
    </>
    )
}
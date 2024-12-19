import PageLayout from "@/components/PageLayout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const WillYou = () => {
    return (
        <PageLayout>
            <Card className='container max-w-lg'>
                <CardHeader>
                    <CardTitle>Hi</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Will you be my valentine?</p>
                    <Button>Yes</Button>
                    <Button>No</Button>
                    <a href="https://www.instagram.com/reel/C24CAVouAAZ/?igsh=NzlnOGQzY21kcTBl">Inspiratoin</a>
                </CardContent>
            </Card>
        </PageLayout>
    )
}

export default WillYou
import { HStack, VStack } from "@chakra-ui/react";

export default function Features() {
    return (
        <VStack w="100vw" bgColor="#fd837e" h="100vh">
            <div className='Logo_Image'></div>
            <h1 className="features_h1">Our Features and Services</h1>
            <HStack>
                <div className='features'>
                    <VStack>
                        <h3 class="material-symbols-outlined">calendar_month</h3>
                        <h2>Reminders</h2>
                        <p>Receive renewal payment reminders 7 days before the renewal date. Get monthly statement of all the subscriptions for the month at the beginning of each months</p>
                    </VStack>
                </div>
                <div className='features'>
                    <VStack>
                        <h3 class="material-symbols-outlined">account_balance</h3>
                        <h2>Automatic pairing</h2>
                        <p>Automaticaly trace all of your monthly subscripstions by linking your bank.</p>
                    </VStack>
                </div>
                <div className='features'>
                    <VStack>
                        <h3 class="material-symbols-outlined">forum</h3>
                        <h2>Advice</h2>
                        <p>Get financial advice through our Chat-GPT plugin.</p>
                    </VStack>
                </div>
            </HStack>
        </VStack>
    )
}
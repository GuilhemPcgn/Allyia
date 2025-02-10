import { ChatInterface } from '@/components/ChatInterface';

export default function ConversationPage() {
    return (
        <main className="min-h-screen bg-gray-50">
            <div className="max-w-3xl mx-auto h-screen flex flex-col">
                <header className="bg-white border-b border-gray-200 p-4">
                    <h1 className="text-xl font-semibold text-gray-800">Discussion avec Allyia</h1>
                </header>

                <ChatInterface />
            </div>
        </main>
    );
}
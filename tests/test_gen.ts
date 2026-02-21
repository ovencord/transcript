
import { createTranscript, type Message, type ChannelInfo } from '../src/index.ts';

const channel: ChannelInfo = {
    id: '123456789',
    name: 'ticket-001',
    topic: 'Support ticket for User #123',
    guildName: 'Support Server',
    guildIconUrl: 'https://cdn.discordapp.com/icons/887462826343510046/c9066666879e69c4fae958155bb3a8f9.png'
};

const messages: Message[] = [
    {
        id: '1',
        content: 'Hello, I need help with my account.',
        author: {
            id: 'user1',
            username: 'Customer',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
            bot: false
        },
        timestamp: new Date(Date.now() - 1000000).toISOString(),
        attachments: [],
        embeds: [],
        reactions: []
    },
    {
        id: '2',
        content: 'Hi! **Support Bot** here. What seems to be the issue?',
        author: {
            id: 'bot1',
            username: 'Support Bot',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/1.png',
            bot: true
        },
        timestamp: new Date(Date.now() - 900000).toISOString(),
        attachments: [],
        embeds: [],
        reactions: []
    },
    {
        id: '3',
        content: 'I cannot login. Here is a screenshot:',
        author: {
            id: 'user1',
            username: 'Customer',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
            bot: false
        },
        timestamp: new Date(Date.now() - 800000).toISOString(),
        attachments: [
            {
                id: 'att1',
                name: 'screenshot.png',
                url: 'https://via.placeholder.com/350x150',
                contentType: 'image/png'
            }
        ],
        embeds: [],
        reactions: []
    },
    {
        id: '4',
        content: '',
        author: {
            id: 'bot1',
            username: 'Support Bot',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/1.png',
            bot: true
        },
        timestamp: new Date(Date.now() - 600000).toISOString(),
        attachments: [],
        embeds: [
            {
                title: 'Login Troubleshooting',
                description: 'Please try the following steps:\n1. Reset password\n2. Clear cache',
                color: 0x5865F2,
                fields: [
                    { name: 'Step 1', value: 'Click [here](https://example.com) to reset.', inline: true },
                    { name: 'Step 2', value: 'Settings > Privacy > Clear', inline: true }
                ],
                footer: {
                    text: 'Automated Response'
                }
            }
        ],
        reactions: []
    },
    {
        id: '5',
        content: 'This message uses the new **Container** component:',
        author: {
            id: 'bot1',
            username: 'Support Bot',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/1.png',
            bot: true
        },
        timestamp: new Date().toISOString(),
        attachments: [],
        embeds: [],
        containers: [
            {
                content: "**Container Title**\nThis is content inside a container.\nIt has a different style than embeds."
            }
        ],
        reactions: []
    },
    {
        id: '6',
        content: 'This message has interactive **components**:',
        author: {
            id: 'bot1',
            username: 'Support Bot',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/1.png',
            bot: true
        },
        timestamp: new Date().toISOString(),
        attachments: [],
        embeds: [],
        components: [
            {
                type: 1,
                components: [
                    { type: 2, style: 1, label: 'Claim Ticket', customId: 'claim', emoji: { name: 'User', id: '123456789' } },
                    { type: 2, style: 4, label: 'Close Ticket', customId: 'close', emoji: { name: '🔒' } }
                ]
            },
            {
                type: 1,
                components: [
                    { 
                        type: 3, 
                        customId: 'category', 
                        placeholder: 'Select a category...', 
                        options: [
                            { label: 'Support', value: 'support' },
                            { label: 'Billing', value: 'billing' }
                        ]
                    }
                ]
            }
        ],
        mediaGalleries: [
            {
                items: [
                    { media: { url: 'https://cdn.discordapp.com/embed/avatars/0.png' }, description: 'Gallery Image 1' },
                    { media: { url: 'https://cdn.discordapp.com/embed/avatars/1.png' }, description: 'Gallery Image 2' },
                    { media: { url: 'https://cdn.discordapp.com/embed/avatars/2.png' }, description: 'Gallery Image 3' }
                ]
            }
        ],
        separators: [
            { divider: true, spacing: 3 }
        ],
        reactions: []
    },
    {
        id: '7',
        content: 'This message uses V2 Components (Type 17 Container):',
        author: {
            id: 'bot1',
            username: 'Support Bot',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/1.png',
            bot: true
        },
        timestamp: new Date().toISOString(),
        attachments: [],
        embeds: [],
        components: [
            {
                type: 17,
                components: [
                    { type: 10, content: '**Text Display** inside container.' },
                    { type: 14, divider: true, spacing: 2 },
                    { 
                        type: 1, 
                        components: [
                            { type: 2, style: 1, label: 'Button Inside', customId: 'btn_in' }
                        ] 
                    }
                ]
            }
        ] as any, // Cast to avoid strict type checking in test file if types aren't fully updated in index export yet
        reactions: []
    }
];

// Run
const htmlBuffer = await createTranscript(messages, channel, { returnType: 'buffer' });
await Bun.write('test_transcript.html', htmlBuffer);
console.log('Transcript generated at test_transcript.html');

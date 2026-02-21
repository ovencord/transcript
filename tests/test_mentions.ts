
import { createTranscript, type Message, type ChannelInfo } from '../src/index';
import fs from 'fs';

const channel: ChannelInfo = {
    id: '123456789',
    name: 'mention-test',
    topic: 'Testing mentions and timestamps',
};

const messages: Message[] = [
    {
        id: '1',
        content: 'Hi <@22222>, I am <@11111>!',
        author: {
            id: '11111',
            username: 'Customer',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/0.png',
            bot: false
        },
        timestamp: new Date().toISOString(),
        attachments: [],
        embeds: [],
        reactions: []
    },
    {
        id: '2',
        content: 'Hello <@11111>! This ticket was claimed at <t:1737800000:R>. Mentioning unknown: <@99999>',
        author: {
            id: '22222',
            username: 'Support Bot',
            avatarURL: 'https://cdn.discordapp.com/embed/avatars/1.png',
            bot: true
        },
        timestamp: new Date().toISOString(),
        attachments: [],
        embeds: [
            {
                description: 'Embed mentioning <@11111> and timestamp <t:1737801000:R>',
                fields: [
                    { name: 'User', value: '<@11111>', inline: true }
                ]
            }
        ],
        reactions: []
    }
];

// Run
const html = await createTranscript(messages, channel, { returnType: 'string' }) as string;
fs.writeFileSync('test_mentions.html', html);
console.log('Transcript generated at test_mentions.html');

// Simple verification in console
if (html.includes('@Customer')) {
    console.log('✅ Mention @Customer found');
} else {
    console.log('❌ Mention @Customer NOT found');
}

if (html.includes('@Support Bot')) {
    console.log('✅ Mention @Support Bot found');
} else {
    console.log('❌ Mention @Support Bot NOT found');
}

if (html.includes('relative time')) {
    console.log('❌ "relative time" found (should be formatted)');
} else {
    console.log('✅ "relative time" NOT found');
}

if (html.includes('@User')) {
    // Falls back to @User if id not in map?
    // In my code: const username = userMap?.get(id) || 'User';
    // So <@99999> becomes @User
    console.log('✅ Mention @User (fallback) found');
}

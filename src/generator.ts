import mustache from 'mustache-bun/mustache.js';
import { htmlTemplate, css } from './template.ts';
import type { Message, TranscriptOptions, ChannelInfo, Button, SelectMenu, AnyComponent, ContainerComponent, TextDisplayComponent, SeparatorComponent, ActionRow } from './types.ts';
// Helper to format Date
function formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    });
}
// Simple Markdown Formatter (Zero-dependency)
function formatContent(content: string, userMap?: Map<string, string>): string {
    if (!content) return '';
    let html = content
        // Escape HTML
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        
        // Headers (must be at start of line or after newline)
        .replace(/^### (.*$)/gm, '<h3>$1</h3>')
        .replace(/^## (.*$)/gm, '<h2>$1</h2>')
        .replace(/^# (.*$)/gm, '<h1>$1</h1>')
        
        // Code Blocks (multiline)
        .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre><code class="language-$1">$2</code></pre>')
        // Code Blocks (simple)
        .replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>')
        
        // Inline Code
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        
        // Links [text](url)
        .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>')
        // Bold
        .replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>')
        
        // Italic
        .replace(/\*([^*]+)\*/g, '<i>$1</i>')
        .replace(/_([^_]+)_/g, '<i>$1</i>')
        
        // Underline
        .replace(/__([^_]+)__/g, '<u>$1</u>')
        
        // Strikethrough
        .replace(/~~([^~]+)~~/g, '<s>$1</s>')
        
        // Newlines
        .replace(/\n/g, '<br>');
    // Mentions (User) <@123456>
    html = html.replace(/&lt;@!?(\d+)&gt;/g, (match, id) => {
        const username = userMap?.get(id) || 'User';
        return `<span class="mention">@${username}</span>`;
    });
    // Mentions (Channel) <#123456>
    html = html.replace(/&lt;#(\d+)&gt;/g, '<span class="mention">#channel</span>');
    // Mentions (Role) <@&123456>
    html = html.replace(/&lt;@&(\d+)&gt;/g, '<span class="mention">@role</span>');
    // Timestamps <t:123456:R>
    html = html.replace(/&lt;t:(\d+):?([A-Z])?&gt;/g, (match, timestamp, _style) => {
        const date = new Date(parseInt(timestamp) * 1000);
        return `<span class="timestamp">${date.toLocaleString()}</span>`;
    });
    return html;
}
// Helper to render V2 Components to HTML string
function renderComponent(component: AnyComponent, userMap?: Map<string, string>): string {
    if (component.type === 17) { // Container
        const container = component as ContainerComponent;
        const children = container.components.map(c => renderComponent(c, userMap)).join('');
        return children;
    }
    if (component.type === 10) { // Text Display
        const text = component as TextDisplayComponent;
        const content = formatContent(text.content, userMap);
        return `<div class="discord-section"><div class="discord-section-content">${content}</div></div>`;
    }
    if (component.type === 14) { // Separator
        const sep = component as SeparatorComponent;
        const style = sep.divider ? 'height: 1px;' : 'height: 0px;';
        const margin = sep.spacing === 3 ? 'margin: 8px 0;' : sep.spacing === 2 ? 'margin: 4px 0;' : 'margin: 0;';
        return `<div class="discord-separator" style="${style} ${margin}"></div>`;
    }
    if (component.type === 1) { // Action Row
        const row = component as ActionRow;
        const children = row.components.map(c => renderComponent(c, userMap)).join('');
        return `<div class="message-component-group">${children}</div>`;
    }
    if (component.type === 2) { // Button
        const btn = component as Button;
        const styleClass = btn.style === 1 ? 'primary' :
                          btn.style === 2 ? 'secondary' :
                          btn.style === 3 ? 'success' :
                          btn.style === 4 ? 'destructive' : 
                          btn.style === 5 ? 'secondary' : 'primary';
        
        let content = '';
        if (btn.emoji) {
             if (btn.emoji.id) {
                 content += `<span style="display: flex; align-items: center;"><img src="https://cdn.discordapp.com/emojis/${btn.emoji.id}.webp?size=44&quality=lossless" alt="${btn.emoji.name}" style="width: 16px; height: 16px; margin-right: 8px;"></span>`;
             } else if (btn.emoji.name) {
                 content += `<span style="display: flex; align-items: center; margin-right: 8px;">${btn.emoji.name}</span>`;
             }
        }
        if (btn.label) {
            content += `<span style="display: flex; align-items: center;">${btn.label}</span>`;
        }
        if (btn.style === 5) {
             content += `<span style="margin-left: 8px; display: flex; align-items: center;"><svg role="img" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M15 2a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v6a1 1 0 1 1-2 0V4.41l-4.3 4.3a1 1 0 1 1-1.4-1.42L19.58 3H16a1 1 0 0 1-1-1Z"/><path fill="currentColor" d="M5 2a3 3 0 0 0-3 3v14a3 3 0 0 0 3 3h14a3 3 0 0 0 3-3v-6a1 1 0 1 0-2 0v6a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V5a1 1 0 0 1 1-1h6a1 1 0 1 0 0-2H5Z"/></svg></span>`;
        }
        const disabledAttr = btn.disabled ? 'disabled' : '';
        if (btn.style === 5 && btn.url) {
             return `<a class="discord-button discord-button-secondary" href="${btn.url}" target="_blank" ${disabledAttr}>${content}</a>`;
        }
        return `<button class="discord-button discord-button-${styleClass}" type="button" ${disabledAttr}>${content}</button>`;
    }
    
    if (component.type === 3 || component.type === 5 || component.type === 6 || component.type === 7 || component.type === 8) {
        const menu = component as SelectMenu;
        return `<div class="discord-select-menu">
            <div style="overflow: hidden; text-overflow: ellipsis; white-space: nowrap;">${menu.placeholder || 'Select...'}</div>
            <div style="display: flex; align-items: center; margin-left: 8px;">
                <svg width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M7 10L12 15L17 10H7Z" /></svg>
            </div>
        </div>`;
    }
    return '';
}
export async function generateTranscript(messages: Message[], channel: ChannelInfo, options: TranscriptOptions = {}) {
    // Build user map
    const userMap = new Map<string, string>();
    for (const msg of messages) {
        if (msg.author && msg.author.id && msg.author.username) {
            userMap.set(msg.author.id, msg.author.username);
        }
        // Also check replyTo author
        if (msg.replyTo?.author?.id && msg.replyTo?.author?.username) {
            userMap.set(msg.replyTo.author.id, msg.replyTo.author.username);
        }
    }

    const processedMessages = messages.map(msg => {
        return {
            ...msg,
            timestamp: formatDate(msg.timestamp),
            content: formatContent(msg.content, userMap),
            embeds: msg.embeds?.map(embed => ({
                ...embed,
                description: embed.description ? formatContent(embed.description, userMap) : undefined,
                fields: embed.fields?.map(field => ({
                    ...field,
                    value: formatContent(field.value, userMap)
                })),
                hexColor: embed.color ? '#' + embed.color.toString(16).padStart(6, '0') : undefined,
            })),
            containers: [
                ...(msg.containers?.map(container => ({
                    ...container,
                    content: container.content
                })) || []),
                ...(msg.components?.filter(c => c.type === 17).map(container => ({
                    content: renderComponent(container, userMap)
                })) || [])
            ],
            components: [
                ...(msg.components?.filter(c => c.type === 1).map(c => {
                    const row = c as ActionRow;
                    return {
                        ...row,
                        components: row.components.map(component => {
                            if (component.type === 2) {
                                const btn = component as Button;
                                return {
                                    ...btn,
                                    isButton: true,
                                    styleClass: btn.style === 1 ? 'primary' :
                                                btn.style === 2 ? 'secondary' :
                                                btn.style === 3 ? 'success' :
                                                btn.style === 4 ? 'destructive' : 
                                                btn.style === 5 ? 'secondary' : 'primary',
                                    isLink: btn.style === 5,
                                    emoji: btn.emoji
                                };
                            } else {
                                return {
                                    ...component,
                                    isSelectMenu: true
                                };
                            }
                        })
                    };
                }) || []),
                ...(msg.components?.some(c => c.type !== 1 && c.type !== 17) ? [{
                    type: 1,
                    components: msg.components.filter(c => c.type !== 1 && c.type !== 17).map(component => {
                        if (component.type === 2) {
                            const btn = component as Button;
                            return {
                                ...btn,
                                isButton: true,
                                styleClass: btn.style === 1 ? 'primary' :
                                            btn.style === 2 ? 'secondary' :
                                            btn.style === 3 ? 'success' :
                                            btn.style === 4 ? 'destructive' : 
                                            btn.style === 5 ? 'secondary' : 'primary',
                                isLink: btn.style === 5,
                                emoji: btn.emoji
                            };
                        } else if (component.type === 3 || component.type === 5 || component.type === 6 || component.type === 7 || component.type === 8) {
                            return {
                                ...component,
                                isSelectMenu: true
                            };
                        }
                        return component;
                    })
                }] : [])
            ],
            mediaGalleries: msg.mediaGalleries,
            separators: msg.separators?.map(sep => ({
                ...sep,
                isLarge: sep.spacing === 3
            })),
            replyTo: msg.replyTo ? {
                ...msg.replyTo,
                contentSnippet: msg.replyTo.content.substring(0, 50) + (msg.replyTo.content.length > 50 ? '...' : '')
            } : undefined
        };
    });
    const view = {
        channel,
        messages: processedMessages,
        css
    };
    const output = (mustache as any).render(htmlTemplate, view);
    if (options.returnType === 'buffer') {
        return Buffer.from(output);
    }
    return output;
}

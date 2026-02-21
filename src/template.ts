
export const css = `
@import url('https://fonts.googleapis.com/css2?family=Fira+Code&display=swap');

:root {
  --background-primary: #313338;
  --background-secondary: #2b2d31;
  --background-secondary-alt: #242529;
  --background-tertiary: #1e1f22;
  --background-floating: #1e1f22;
  --background-accent: #404249;
  --background-modifier-hover: rgba(78, 80, 88, 0.16);
  --background-modifier-active: rgba(78, 80, 88, 0.24);
  --background-modifier-selected: rgba(78, 80, 88, 0.32);
  --text-normal: #dbdee1;
  --text-muted: #949ba4;
  --text-link: #00a8fc;
  --text-positive: #23a559;
  --text-warning: #f0b232;
  --text-danger: #f23f43;
  --header-primary: #f2f3f5;
  --header-secondary: #b5bac1;
  --interactive-normal: #b5bac1;
  --interactive-hover: #dbdee1;
  --interactive-active: #ffffff;
  --interactive-muted: #4e5058;
  --brand-experiment: #5865f2;
  --brand-experiment-560: #4752c4;
  --status-online: #23a559;
  --status-idle: #f0b232;
  --status-dnd: #f23f43;
  --status-offline: #80848e;
  --button-secondary-background: #4e5058;
  --button-secondary-background-hover: #6d6f78;
  --button-secondary-background-active: #80848e;
  --button-danger-background: #da373c;
  --button-danger-background-hover: #a12828;
  --button-danger-background-active: #892222;
  --button-positive-background: #248046;
  --button-positive-background-hover: #1a6334;
  --button-positive-background-active: #15522b;
  --mention-background: rgba(88, 101, 242, 0.3);
  --mention-foreground: #dee0fc;
  --mention-hover-background: rgba(88, 101, 242, 0.6);
  --embed-background: #2b2d31;
  --embed-background-alternate: #242529;
  --message-margin-horizontal: 16px;
  --message-margin-vertical: 1.0625rem;
  --avatar-size: 40px;
}

* { box-sizing: border-box; }

body {
  background-color: var(--background-primary);
  color: var(--text-normal);
  font-family: 'gg sans', 'Whitney', 'Helvetica Neue', Helvetica, Arial, sans-serif;
  font-size: 1rem;
  line-height: 1.375rem;
  letter-spacing: -0.02em;
  margin: 0;
  padding: 0;
  -webkit-font-smoothing: antialiased;
}

a { color: var(--text-link); text-decoration: none; }
a:hover { text-decoration: underline; }

.guild-header {
  background-color: var(--background-primary);
  padding: 0 16px;
  display: flex;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 100;
  height: 48px;
  box-shadow: 0 1px 0 rgba(0,0,0,0.2), 0 1.5px 0 rgba(0,0,0,0.05), 0 2px 0 rgba(0,0,0,0.05);
}

.guild-icon {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  margin-right: 8px;
}

.guild-info h1 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--header-primary);
  margin: 0;
}

.channel-info {
  font-size: 0.875rem;
  color: var(--header-secondary);
  margin-left: 8px;
  padding-left: 8px;
  border-left: 1px solid var(--background-modifier-active);
}

.chatlog { padding: 0; }

.message-group {
    display: flex;
    margin-top: var(--message-margin-vertical);
    padding: 2px 16px;
    position: relative;
}

.message-group:hover {
    background-color: rgba(0,0,0,0.02);
}

.author-avatar {
    width: var(--avatar-size);
    height: var(--avatar-size);
    border-radius: 50%;
    margin-right: 16px;
    margin-top: 2px;
    flex-shrink: 0;
    cursor: pointer;
}

.message-content-wrapper { flex: 1; min-width: 0; }

.message-header {
    display: flex;
    align-items: center;
    line-height: 1.375rem;
}

.author-name {
    font-size: 1rem;
    font-weight: 500;
    color: var(--header-primary);
    margin-right: 0.25rem;
    cursor: pointer;
}

.author-name:hover { text-decoration: underline; }

.bot-tag {
    background-color: var(--brand-experiment);
    color: #ffffff;
    font-size: 0.725rem;
    text-transform: uppercase;
    height: 0.9375rem;
    padding: 0 4.8px;
    border-radius: 3px;
    line-height: 0.9375rem;
    font-weight: 600;
    margin-left: 0.25rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    vertical-align: baseline;
    position: relative;
    top: -1px;
}

.bot-tag svg {
    margin-right: 2px;
    width: 1rem;
    height: 1rem;
    margin-inline-start: -0.2rem;
    margin-top: -0.02rem;
}

.bot-tag-text {
    line-height: 0.9375rem;
}

.timestamp {
    font-size: 0.75rem;
    color: var(--text-muted);
    margin-left: 0.5rem;
    font-weight: 400;
}

.message-body {
    font-size: 1rem;
    line-height: 1.375rem;
    color: var(--text-normal);
    white-space: pre-wrap;
    word-wrap: break-word;
    margin-top: 2px;
}

.mention {
    background-color: var(--mention-background);
    color: var(--mention-foreground);
    border-radius: 3px;
    padding: 0 2px;
    font-weight: 500;
    cursor: pointer;
}

.mention:hover {
    background-color: var(--mention-hover-background);
    color: #ffffff;
}

.reply-reference {
    display: flex;
    align-items: center;
    font-size: 0.875rem;
    color: var(--text-muted);
    margin-bottom: 4px;
    margin-left: 56px;
    position: relative;
}

.reply-reference::before {
    content: "";
    display: block;
    position: absolute;
    top: 50%;
    left: -33px;
    bottom: 0;
    border-top: 2px solid #4e5058;
    border-left: 2px solid #4e5058;
    border-top-left-radius: 6px;
    width: 33px;
    height: 10px;
}

.reply-avatar {
    width: 16px;
    height: 16px;
    border-radius: 50%;
    margin-right: 4px;
}

.reply-user {
    font-weight: 500;
    margin-right: 4px;
    cursor: pointer;
}

.reply-user:hover { text-decoration: underline; }

.reply-content {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.embed {
    display: flex;
    max-width: 520px;
    background-color: var(--background-secondary);
    border-radius: 8px;
    border-left: 4px solid var(--background-tertiary);
    margin-top: 8px;
    padding: 8px 16px 16px 12px;
    position: relative;
}

.embed-content {
    display: flex;
    flex-direction: column;
    flex: 1;
}

.embed-author {
    display: flex;
    align-items: center;
    margin-top: 8px;
    margin-bottom: 8px;
}

.embed-author-icon {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    margin-right: 8px;
}

.embed-author-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--header-primary);
}

.embed-title {
    font-size: 1rem;
    font-weight: 600;
    color: var(--text-link);
    margin-bottom: 4px;
}

.embed-description {
    font-size: 0.875rem;
    line-height: 1.125rem;
    color: var(--text-normal);
    white-space: pre-wrap;
}

.embed-fields {
    display: grid;
    grid-gap: 8px;
    margin-top: 8px;
}

.embed-field-name {
    font-size: 0.875rem;
    font-weight: 600;
    color: var(--header-primary);
    margin-bottom: 2px;
}

.embed-field-value {
    font-size: 0.875rem;
    color: var(--text-normal);
    white-space: pre-wrap;
}

.embed-footer {
    display: flex;
    align-items: center;
    margin-top: 8px;
}

.embed-footer-icon {
    width: 20px;
    height: 20px;
    border-radius: 50%;
    margin-right: 8px;
}

.embed-footer-text {
    font-size: 0.75rem;
    color: var(--text-muted);
}

.message-component-group {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-top: 8px;
}

.discord-button {
    height: 32px;
    min-width: 60px;
    padding: 2px 16px;
    border-radius: 4px;
    font-size: 14px;
    font-weight: 500;
    color: #ffffff;
    border: none;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.17s ease;
}

.discord-button-primary { background-color: var(--brand-experiment); }
.discord-button-primary:hover { background-color: var(--brand-experiment-560); }
.discord-button-secondary { background-color: var(--button-secondary-background); }
.discord-button-secondary:hover { background-color: var(--button-secondary-background-hover); }
.discord-button-success { background-color: var(--button-positive-background); }
.discord-button-success:hover { background-color: var(--button-positive-background-hover); }
.discord-button-destructive { background-color: var(--button-danger-background); }
.discord-button-destructive:hover { background-color: var(--button-danger-background-hover); }

.discord-container {
    background-color: var(--background-secondary);
    border: 1px solid rgba(255,255,255,0.05);
    border-radius: 8px;
    padding: 12px;
    margin-top: 8px;
    max-width: 520px;
}

.discord-separator {
    height: 1px;
    background-color: rgba(255,255,255,0.05);
    margin: 8px 0;
}
`;

export const htmlTemplate = "<!DOCTYPE html><html lang='en'><head><meta charset='UTF-8'><meta name='viewport' content='width=device-width, initial-scale=1.0'><title>Transcript - {{channel.name}}</title><style>{{css}}</style></head><body><header class='guild-header'>{{#channel.guildIconUrl}}<img src='{{channel.guildIconUrl}}' alt='Guild Icon' class='guild-icon'>{{/channel.guildIconUrl}}<div class='guild-info'><h1>{{channel.name}}</h1></div>{{#channel.topic}}<div class='channel-info'>{{channel.topic}}</div>{{/channel.topic}}</header><div class='chatlog'>{{#messages}}<div class='message-group' id='message-{{id}}'>{{#replyTo}}<div class='reply-reference'><img src='{{replyTo.author.avatarURL}}' class='reply-avatar'><span class='reply-user' style='color: {{replyTo.author.color}};'>{{replyTo.author.username}}</span><span class='reply-content'>{{replyTo.contentSnippet}}</span></div>{{/replyTo}}<img src='{{author.avatarURL}}' class='author-avatar' alt='{{author.username}}'><div class='message-content-wrapper'><div class='message-header'><span class='author-name' {{#author.color}}style='color:{{author.color}}'{{/author.color}}>{{author.username}}</span>{{#author.bot}}<span class='bot-tag'><svg aria-hidden='true' role='img' xmlns='http://www.w3.org/2000/svg' width='24' height='24' fill='none' viewBox='0 0 24 24'><path fill='white' fill-rule='evenodd' d='M19.06 6.94a1.5 1.5 0 0 1 0 2.12l-8 8a1.5 1.5 0 0 1-2.12 0l-4-4a1.5 1.5 0 0 1 2.12-2.12L10 13.88l6.94-6.94a1.5 1.5 0 0 1 2.12 0Z' clip-rule='evenodd'></path></svg><span class='bot-tag-text'>APP</span></span>{{/author.bot}}<span class='timestamp'>{{timestamp}}</span></div><div class='message-body'>{{{content}}}</div>{{#attachments}}<div class='attachment attachment-image'><a href='{{url}}' target='_blank'><img src='{{url}}' alt='{{name}}' style='max-width: 100%; max-height: 350px; border-radius: 4px; margin-top: 8px;'></a></div>{{/attachments}}{{#containers}}<div class='discord-container'>{{{content}}}</div>{{/containers}}{{#components}}<div class='message-component-group'>{{#components}}{{#isButton}}<button class='discord-button discord-button-{{styleClass}}' type='button' {{#disabled}}disabled{{/disabled}}>{{#emoji.id}}<img src='https://cdn.discordapp.com/emojis/{{emoji.id}}.webp?size=44&quality=lossless' alt='{{emoji.name}}' style='width: 16px; height: 16px; margin-right: 8px;'>{{/emoji.id}}{{#emoji.name}}{{^emoji.id}}<span style='margin-right: 8px;'>{{emoji.name}}</span>{{/emoji.id}}{{/emoji.name}}<span>{{label}}</span></button>{{/isButton}}{{#isSelectMenu}}<div class='discord-select-menu' style='background: var(--background-tertiary); padding: 8px 12px; border-radius: 4px; color: var(--text-muted); cursor: pointer; display: flex; justify-content: space-between; align-items: center; min-width: 200px; margin-top: 4px;'><span>{{placeholder}}</span><svg width='24' height='24' viewBox='0 0 24 24'><path fill='currentColor' d='M7 10L12 15L17 10H7Z' /></svg></div>{{/isSelectMenu}}{{/components}}</div>{{/components}}{{#embeds}}<div class='embed' {{#hexColor}}style='border-left: 4px solid {{hexColor}};'{{/hexColor}}><div class='embed-content'>{{#author}}<div class='embed-author'>{{#iconURL}}<img src='{{iconURL}}' class='embed-author-icon'>{{/iconURL}}<span class='embed-author-name'>{{name}}</span></div>{{/author}}{{#title}}<div class='embed-title'>{{title}}</div>{{/title}}{{#description}}<div class='embed-description'>{{{description}}}</div>{{/description}}{{#fields.length}}<div class='embed-fields'>{{#fields}}<div class='embed-field'><div class='embed-field-name'>{{name}}</div><div class='embed-field-value'>{{{value}}}</div></div>{{/fields}}</div>{{/fields.length}}{{#image}}<img src='{{url}}' style='max-width: 100%; border-radius: 4px; margin-top: 8px;'>{{/image}}{{#footer}}<div class='embed-footer'>{{#iconURL}}<img src='{{iconURL}}' class='embed-footer-icon'>{{/iconURL}}<span class='embed-footer-text'>{{text}}</span></div>{{/footer}}</div></div>{{/embeds}}</div></div>{{/messages}}</div></body></html>";

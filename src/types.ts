export interface Attachment {
    id: string;
    url: string;
    name: string;
    contentType?: string;
}

export interface EmbedAuthor {
    name: string;
    url?: string;
    iconURL?: string;
}

export interface EmbedFooter {
    text: string;
    iconURL?: string;
}

export interface EmbedField {
    name: string;
    value: string;
    inline?: boolean;
}

export interface Embed {
    title?: string;
    url?: string;
    description?: string;
    author?: EmbedAuthor;
    color?: number; // Integer color
    footer?: EmbedFooter;
    image?: { url: string };
    thumbnail?: { url: string };
    timestamp?: string; // ISO string
    fields?: EmbedField[];
}

export interface Reaction {
    emoji: {
        id?: string | null;
        name: string | null;
        url?: string | null;
    };
    count: number;
}

export interface Container {
    content: string; // Markdown content inside the container
}


export interface Button {
    type: 2;
    style: 1 | 2 | 3 | 4 | 5; // 1: Primary (Blurple), 2: Secondary (Grey), 3: Success (Green), 4: Danger (Red), 5: Link (Grey/Url)
    label?: string;
    customId?: string;
    url?: string;
    disabled?: boolean;
    emoji?: {
        id?: string;
        name: string;
        animated?: boolean;
    };
}

export interface SelectMenuOption {
    label: string;
    value: string;
    description?: string;
    emoji?: {
        id?: string;
        name: string;
        animated?: boolean;
    };
    default?: boolean;
}

export interface SelectMenu {
    type: 3 | 5 | 6 | 7 | 8; // 3: String, 5: User, 6: Role, 7: Mentionable, 8: Channel
    customId: string;
    options?: SelectMenuOption[]; // Only for String Select (type 3)
    placeholder?: string;
    minValues?: number;
    maxValues?: number;
    disabled?: boolean;
}

export interface MediaGalleryItem {
    media: {
        url: string;
        width?: number;
        height?: number;
    };
    description?: string;
}

export interface MediaGallery {
    items: MediaGalleryItem[];
}

export interface Separator {
    divider: boolean;
    spacing: 1 | 2 | 3; // Small, Medium, Large
}

export type ActionRowComponent = Button | SelectMenu;

export interface ActionRow {
    type: 1;
    components: ActionRowComponent[];
}

export interface TextDisplayComponent {
    type: 10;
    content: string;
}

export interface SeparatorComponent {
    type: 14;
    divider?: boolean;
    spacing?: 1 | 2 | 3; // Small, Medium, Large
}

export interface ContainerComponent {
    type: 17;
    components: (ActionRow | TextDisplayComponent | SeparatorComponent)[];
    accentColor?: number;
    spoiler?: boolean;
}

export type AnyComponent = ActionRow | Button | SelectMenu | TextDisplayComponent | SeparatorComponent | ContainerComponent;

export interface Message {
    id: string;
    content: string;
    author: {
        id: string;
        username: string;
        discriminator?: string; // Legacy support
        avatarURL: string;
        bot?: boolean;
        color?: string; // Hex color for username
    };
    timestamp: string; // ISO string
    editedTimestamp?: string | null;
    attachments: Attachment[];
    embeds: Embed[];
    containers?: Container[]; // For rendered HTML content
    components?: AnyComponent[]; // Updated to allow all component types including top-level Containers
    mediaGalleries?: MediaGallery[]; // V2 Media Gallery
    separators?: Separator[]; // V2 Spacing/Dividers
    reactions: Reaction[];
    reference?: {
        messageId: string;
    };
    replyTo?: Message; // Populated during processing if reference exists
}

export interface ChannelInfo {
    name: string;
    topic?: string;
    id: string;
    guildName?: string;
    guildIconUrl?: string;
}

export interface TranscriptOptions {
    returnType?: 'string' | 'buffer' | 'file'; // Default buffer
    fileName?: string; // For 'file' type output
    minify?: boolean; // Default true
    saveImages?: boolean; // TODO: Future feature to download images?
    poweredBy?: boolean; // Show "Powered by..." footer
}

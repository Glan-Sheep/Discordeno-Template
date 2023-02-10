import {
  DiscordEmbedAuthor,
  DiscordEmbedField,
  DiscordEmbedFooter,
  Embed,
} from "discordeno/mod.ts";
import { normalizeArray, type RestOrArray } from "../utils/normalizeArray.ts";
export type RGBTuple = [red: number, green: number, blue: number];

export class EmbedBuilder {
  public readonly data: Embed;

  public constructor(data: Embed = {}) {
    this.data = { ...data };
  }

  public addFields(...fields: RestOrArray<DiscordEmbedField>): this {
    fields = normalizeArray(fields);

    if (this.data.fields) this.data.fields.push(...fields);
    else this.data.fields = fields;
    return this;
  }

  setTitle(title: string | null): this {
    this.data.title = title ?? undefined;
    return this;
  }
  setDescription(description: string | null): this {
    this.data.description = description ?? undefined;
    return this;
  }
  setURL(url: string | null): this {
    this.data.url = url ?? undefined;
    return this;
  }
  setFooter(options: DiscordEmbedFooter | null): this {
    if (options === null) {
      this.data.footer = undefined;
      return this;
    }

    this.data.footer = { text: options.text, iconUrl: options.icon_url };
    return this;
  }
  setImage(url: string | null): this {
    this.data.image = url ? { url } : undefined;
    return this;
  }
  toJSON(): Embed {
    return { ...this.data };
  }
  setAuthor(options: DiscordEmbedAuthor | null): this {
    if (options === null) {
      this.data.author = undefined;
      return this;
    }
    this.data.author = {
      name: options.name,
      url: options.url,
      iconUrl: options.icon_url,
    };
    return this;
  }
  setThumbnail(url: string | null): this {
    this.data.thumbnail = url ? { url } : undefined;
    return this;
  }
  setColor(color: RGBTuple | number | null): this {
    if (Array.isArray(color)) {
      const [red, green, blue] = color;
      this.data.color = (red << 16) + (green << 8) + blue;
      return this;
    }
    this.data.color = color ?? undefined;
    return this;
  }
}

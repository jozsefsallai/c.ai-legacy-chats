# character.ai legacy chats

This Chrome extension adds a button on [character.ai][c-ai-url] chat pages which
allows you to create new chats using the legacy/old chat interface.

**Download:** [Chrome Web Store][store-url]

## FAQ

**Why?**

The new chat interface is still a bit buggy and lacks some features that the old
interface had, such as the ability to upload images in conversations. Some users
of the app may prefer to use the old interface, either just for the missing
features or because it just works better for them.

**Is this safe?**

Yes, the Chrome extension just adds a button to the web page which sends a
request to the legacy chat endpoint to create a new chat. It _does_ access your
authentication token from your browser's local storage, however, this is only
required for the request to go through. The extension does not do anything else
with your token and if you're skeptical, you can look at the source code or use
a self-built version.

**Can this get me banned on c.ai?**

I don't know! They may have some logs in place to detect whenever someone uses
the legacy endpoint, and what they will do with that information is completely
up to them. All in all, **use the extension at your own risk**.

Realistically speaking, I don't think they would ban anyone, especially since
there might still be some users who use an older version of the mobile app,
which basically hits the same legacy endpoint.

**Can I use this on Firefox?**

The extension does not currently have a Firefox version, however, you can use
it on any Chromium-based browser (such as Brave, Edge, or Opera).

Additionally, if you know how to work with userscripts, you can look at the
[source code][src-url] and create a basic userscript that does the same thing.

**Can I use this on mobile?**

No, extensions are not supported in the mobile version of Chrome.

## Development

**Clone the repo:**

```sh
git clone git@github.com:jozsefsallai/c.ai-legacy-chats.git
cd c.ai-legacy-chats
```

**Install the dependencies:**

```sh
npm install
```

**Build the extension:**

```sh
npm run build
```

The updated extension will be available in the `dist` directory. You can load it
unpacked inside Chrome.

## License

MIT.

[c-ai-url]: https://character.ai
[src-url]: https://github.com/jozsefsallai/c.ai-legacy-chats/blob/master/src/content.ts
[store-url]: https://chrome.google.com/webstore/detail/characterai-legacy-chats/ffjaddegbanepalfeabpbjlimjalecgc

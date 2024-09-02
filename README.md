# vim-ray-so

This plugin allows you to easily generate beautiful code images using the [Ray.so](https://ray.so) service directly from your Vim or Neovim editor.

![screen](./docs/screen.avif)


## Features

- Generate code images from selected text or entire buffer
- Customize image settings such as theme, padding, background, and dark mode
- Automatic language detection based on filetype
- Opens the generated image URL in your default browser

## Installation

Using your preferred plugin manager, add the following to your configuration:

```vim
" For vim-plug
Plug 'ryoppippi/vim-ray-so'
Plug 'vim-denops/denops.vim'
```
```lua
-- For lazy.nvim
{
    "ryoppippi/vim-ray-so",
    dependencies = {
        "vim-denops/denops.vim",
    },
}

```

Make sure you have [Deno](https://deno.land/) installed on your system, as this plugin uses Deno for its runtime.

## Usage

Use the `:RaySo` command to generate a code image:

- Without a visual selection: `:RaySo` will use the entire buffer
- With a visual selection: Select the desired code and use `:RaySo`
- Custom title: `:RaySo my_custom_title`
- Directly Copy to clipboard: `:RaySoClipboard`

The generated image URL will automatically open in your default browser.

## Configuration

You can customize the default settings in your Vim/Neovim configuration:

```vim
" Theme (default: 'vercel')
let g:ray_so_theme = 'supabase'

" Padding (default: 16)
let g:ray_so_padding = 32

" Background (default: v:true)
let g:ray_so_background = v:false

" Dark mode (default: v:true)
let g:ray_so_darkmode = v:false
```

you can see the available options at [`types.ts`](./denops/ray-so/types.ts)

## Requirements

- Vim or Neovim with Deno support
- [Deno](https://deno.land/) installed on your system

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Related Projects
- [rayso.nvim](https://github.com/TobinPalmer/rayso.nvim)
- [carbon-now.nvim](https://github.com/ellisonleao/carbon-now.nvim)
- [vim-carbon-now-sh](https://github.com/kristijanhusak/vim-carbon-now-sh)
- [denops-silicon.vim](https://github.com/skanehira/denops-silicon.vim)
- [sillicon.nvim](https://github.com/krivahtoo/silicon.nvim)
- [vim-sillicon](https://github.com/segeljakt/vim-silicon)
- [freeze.nvim](https://github.com/ethanholz/freeze.nvim)

## License

This project is licensed under the [MIT License](./LICENSE).

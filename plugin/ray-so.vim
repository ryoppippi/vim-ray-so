if exists('g:loaded_ray_so')
  finish
endif

let g:loaded_ray_so = 1

let g:ray_so_theme = get(g:, 'ray_so_theme', 'vercel')
let g:ray_so_padding = get(g:, 'ray_so_padding', 16)
let g:ray_so_background = get(g:, 'ray_so_background', v:true)
let g:ray_so_darkmode = get(g:, 'ray_so_darkmode', v:true)

function! s:call(Callback) abort
  call denops#plugin#wait_async('ray-so', a:Callback)
endfunction

function! s:open(args, range, range_given) abort
  let l:Callback = function('denops#notify', [
        \ 'ray-so',
        \ 'open',
        \ a:range_given ? [a:args, a:range] : [a:args],
        \])
  call s:call(l:Callback)
endfunction

function! s:clipboard(args, range, range_given) abort
  let l:Callback = function('denops#notify', [
        \ 'ray-so',
        \ 'clipboard',
        \ a:range_given ? [a:args, a:range] : [a:args],
        \])
  call s:call(l:Callback)
endfunction

command! -bar -range=0 -nargs=* RaySo call s:open([<f-args>], [<line1>, <line2>], <count>)
command! -bar -range=0 -nargs=* RaySoClipboard call s:clipboard([<f-args>], [<line1>, <line2>], <count>)

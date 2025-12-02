# ffmpeg -y -i playroom.mp4 -filter_complex "
#   split=2[a][b];
#   [a]crop=488:1080:0:0[L];
#   [b]crop=488:1080:1464:0[R];
#   [L][R]hstack=inputs=2[stack];
#   [stack]drawbox=x=488:y=0:w=8:h=1080:color=white:t=fill[out]
# " -map "[out]" -c:v libx264 -crf 16 -preset slow -pix_fmt yuv420p playroom_single.mp4

ffmpeg -y -i playroom.mp4 -filter_complex "
split=2[a][b];
[a]crop=1920:1080:0:0[L];
[b]crop=1920:1080:1920:0[R];
[L][R]blend=all_expr='if(lte(X,W*(1-abs(mod(T/1.996,2)-1))),A,B)'[blend];
[blend]geq=lum='if(between(X, W*(1-abs(mod(T/1.996,2)-1))-4, W*(1-abs(mod(T/1.996,2)-1))+4),255,lum(X,Y))':cb='cb(X,Y)':cr='cr(X,Y)'[out]
" -map "[out]" -c:v libx264 -crf 16 -preset veryslow -pix_fmt yuv420p playroom_single.mp4

# ffmpeg -y -i playroom.mp4 -filter_complex "
# split=2[a][b];
# [a]crop=1920:1080:0:0[L];
# [b]crop=1920:1080:1920:0[R];
# [L][R]blend=all_expr='if(lte(X,W*(1-abs(mod(T/1.660,2)-1))),A,B)'[blend];
# [blend]geq=lum='if(between(X, W*(1-abs(mod(T/1.660,2)-1))-4, W*(1-abs(mod(T/1.660,2)-1))+4),255,lum(X,Y))':cb='cb(X,Y)':cr='cr(X,Y)'[out]
# " -map "[out]" -c:v libx264 -crf 16 -preset veryslow -pix_fmt yuv420p playroom_single.mp4
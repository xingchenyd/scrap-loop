import os, shutil

# Backup current effect sprites
src_dir = r'C:\Users\lenovo\Documents\Codex\2026-06-13\recycle-quest\assets\effects'
bak_dir = r'C:\Users\lenovo\Documents\Codex\2026-06-13\recycle-quest\assets\effects_backup_v1'
os.makedirs(bak_dir, exist_ok=True)
for f in os.listdir(src_dir):
    if f.endswith('_sheet.png'):
        shutil.copy2(os.path.join(src_dir, f), os.path.join(bak_dir, f))
        print(f'Backed up: {f}')
print(f'\nBackup saved to: {bak_dir}')

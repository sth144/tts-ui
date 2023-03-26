import { Injectable } from '@nestjs/common';
import { execSync } from 'child_process';
import { join } from 'path';

@Injectable()
export class FilepathService {
  /**
   * converts mp3 title to lowercase, doesn't affect directories in path
   */
  public sanitizedFilepathFromTitle(filepath: string): string {
    let pathstr = '';
    let titlestr = '';
    if (filepath.includes('/')) {
      const pathsplit = filepath.split('/');
      titlestr = `${pathsplit[pathsplit.length - 1]}`;
      pathstr = filepath.replace(titlestr, '');
    } else {
      titlestr = filepath;
      pathstr = '';
    }

    return `${pathstr}${titlestr.toLocaleLowerCase().replace(' ', '-')}.mp4`;
  }

  public ensureRelativePathAvailable(filepath: string) {
    if (filepath.includes('/')) {
      const split = filepath.split('/');
      split.pop();
      let dirpath = '';
      for (const item of split) {
        dirpath += `${item}/`;
      }
      execSync(`mkdir -p ${join(process.cwd(), '../output')}/${dirpath}`);
    }
  }

  public getRelativeOutputPath(filepath: string) {
    return join(process.cwd(), `../output/${filepath}`);
  }

  public moveFileWithinOutputDir(
    fromOutputPath: string,
    toOutputPath: string,
  ): void {
    this.ensureRelativePathAvailable(toOutputPath);
    const fromPathAbs = join(process.cwd(), `../output/${fromOutputPath}`);
    const toPathAbs = join(process.cwd(), `../output/${toOutputPath}`);

    execSync(`mv ${fromPathAbs} ${toPathAbs}`);
    this.cleanupEmptySubdirectories();
  }

  public deleteFileWithinOutputDir(deleteFromOutputPath: string): void {
    const deletePathAbs = join(
      process.cwd(),
      `../output/${deleteFromOutputPath}`,
    );
    execSync(`rm ${deletePathAbs}`);
    this.cleanupEmptySubdirectories();
  }

  public cleanupEmptySubdirectories(): void {
    execSync(
      `find ${(join(process.cwd()), '../output/')} -type d -empty -delete`,
    );
  }
}

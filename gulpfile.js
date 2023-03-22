"use strict";

const gulp = require("gulp");
const gulpTypeScript = require("gulp-typescript");
const tsconfigClient = gulpTypeScript.createProject("./client/tsconfig.json");
const tsconfigServer = gulpTypeScript.createProject("./server/tsconfig.json");
const gulpSourcemap = require("gulp-sourcemaps");
const browserSync = require("browser-sync").create();
const path = require("path");
const spawn = require("child_process").spawn;
const dotenv = require("dotenv");
const { existsSync } = require("fs");
const { execSync, spawnSync } = require("child_process");
dotenv.config({ path: path.join(process.cwd(), "server/.env") });

/**
 * browser manipulation
 */
gulp.task("browser-sync-init", (done) => {
  browserSync.init({
    proxy: `http://localhost:${process.env.PORT}`,
    open: true,
  });

  done();
});

let reloadTimeout = null;
gulp.task("browser-sync-reload", (done) => {
  if (reloadTimeout !== null) {
    clearTimeout(reloadTimeout);
    reloadTimeout = null;
  }

  const retryTimeoutMs = 8000;
  const maxRetries = 4;
  let retry = 0;

  const checkForIndexHtmlReloadIfPresent = () => {
    if (existsSync("client/dist/tts-ui-client/index.html")) {
      browserSync.reload();
      done();
    } else {
      console.log(`No index.html found, retrying`);
      if (retry++ < maxRetries) {
        reloadTimeout = setTimeout(
          checkForIndexHtmlReloadIfPresent,
          retryTimeoutMs
        );
      }
    }
  };

  reloadTimeout = setTimeout(checkForIndexHtmlReloadIfPresent, retryTimeoutMs);
});

/** Client */

let clientBuildLock = false;
gulp.task("build:client", (done) => {
  if (!clientBuildLock) {
    clientBuildLock = true;
    startWorker(
      "npm",
      ["run", "build"],
      {
        cwd: path.join(process.cwd(), "client"),
      },
      () => {
        setTimeout(() => {
          clientBuildLock = false;
        }, 6000);
        done();
      }
    );
  } else {
    console.log("Pending rebuild, skipping");
    done();
  }
});

gulp.task("bundle-watch:client", (done) => {
  // TODO: don't rebuild whole client when SASS modified, just SASS files
  gulp.watch(
    ["client/src/**/*.scss", "client/src/**/*.ts", "client/src/**/*.html"],
    gulp.series("build:client")
  );

  gulp.watch(
    [
      "client/dist/tts-ui-client/static/js",
      "client/dist/tts-ui-client/index.html",
      "client/dist/tts-ui-client/static/css",
    ],
    gulp.series("browser-sync-reload", "test:client")
  );
});

let clientTestLock = false;
gulp.task("test:client", (done) => {
  if (!clientTestLock) {
    clientTestLock = true;
    startWorker("./test/test.sh", ["test_client"], {}, () => {
      setTimeout(() => {
        clientTestLock = false;
      }, 6000);
      done();
    });
  } else {
    console.log("Pending test, skipping");
    done();
  }
});

gulp.task(
  "dev:client",
  gulp.parallel("browser-sync-init", "bundle-watch:client")
);

/** Server */

gulp.task("test:server", (done) => {
  startWorker("./test/test.sh", ["test_server"], {}, done);
});
gulp.task("dev:server", (done) => {
  let dockerDevServicesRunning = false;
  try {
    let pid = execSync("pidof mongod").toString();

    if (pid.length > 0) {
      dockerDevServicesRunning = true;
    }
  } catch {}

  if (!dockerDevServicesRunning) {
    execSync("docker-compose -f docker-compose.dev.yml up -d");
  }

  startWorker(
    "npm",
    ["run", "build"],
    {
      cwd: path.join(process.cwd(), "server"),
    },
    () => {
      startWorker(
        "npm",
        ["run", "start:debug"],
        {
          cwd: path.join(process.cwd(), "server"),
        },
        done
      );
    }
  );

  gulp.watch("server/dist", gulp.series("browser-sync-reload", "test:server"));
});

/*******************************************************************************
 *                               Utilities                                     *
 *******************************************************************************/
/** spawn a worker process and pipe stdout */
const startWorker = (cmd, args, config, doneCallback) => {
  const worker = spawn(cmd, args, {
    stdio: "inherit",
    ...config,
  });
  worker.on("data", (data) => {
    console.log(data.toString());
  });
  worker.on("error", (data) => {
    console.log(data.toString());
  });
  worker.on("exit", () => {
    doneCallback();
  });
};

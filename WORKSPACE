workspace(name = "com_google_javascript_closure_library")

load("@bazel_tools//tools/build_defs/repo:http.bzl", "http_archive")

http_archive(
    name = "bazel_skylib",
    sha256 = "d00f1389ee20b60018e92644e0948e16e350a7707219e7a390fb0a99b6ec9262",
    urls = [
        "https://mirror.bazel.build/github.com/bazelbuild/bazel-skylib/releases/download/1.7.0/bazel-skylib-1.7.0.tar.gz",
        "https://github.com/bazelbuild/bazel-skylib/releases/download/1.7.0/bazel-skylib-1.7.0.tar.gz",
    ],
)

load("@bazel_skylib//:workspace.bzl", "bazel_skylib_workspace")

bazel_skylib_workspace()

http_archive(
    name = "rules_nodejs",
    sha256 = "0c2277164b1752bb71ecfba3107f01c6a8fb02e4835a790914c71dfadcf646ba",
    urls = ["https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.5/rules_nodejs-core-5.8.5.tar.gz"],
)

http_archive(
    name = "build_bazel_rules_nodejs",
    sha256 = "a1295b168f183218bc88117cf00674bcd102498f294086ff58318f830dd9d9d1",
    urls = [
        "https://github.com/bazelbuild/rules_nodejs/releases/download/5.8.5/rules_nodejs-5.8.5.tar.gz",
    ],
)

http_archive(
    name = "io_bazel_rules_closure",
    sha256 = "8f2e6960482161be9241be18530de7141c2b118b5153512b2985f0a89001a978",
    strip_prefix = "rules_closure-10ed2f90fc923f9be658a352c02ec8bb3dd2fa55",
    url = "https://github.com/ribrdb/rules_closure/archive/10ed2f90fc923f9be658a352c02ec8bb3dd2fa55.tar.gz",
)

# load("@io_bazel_rules_closure//closure:defs.bzl", "closure_repositories")

# closure_repositories()

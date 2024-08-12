// import 'dart:io';

import 'dart:io';

extension _ListExtension<E> on List<E> {
  List<T> _mapIndexed<T>(T Function(int index, E item) mapper) {
    return List.generate(length, (index) => mapper(index, this[index]));
  }
}

extension _UtilExtensions on String {
  List<String> _multiSplit(Iterable<String> delimeters) => delimeters.isEmpty
      ? [this]
      : split(RegExp(delimeters.map(RegExp.escape).join('|')));
}

String _enumNameFromFileName(String fileName) {
  final fileNameWithoutExt = fileName.split(".")[0];
  return fileNameWithoutExt._multiSplit(["-", "_"])._mapIndexed((i, e) {
    if (i == 0) return e;
    return "${e[0].toUpperCase()}${e.substring(1).toLowerCase()}";
  }).join("");
}

String _enumItemFromFileName(String fileName) {
  return "${_enumNameFromFileName(fileName)} = \`\${prefix}/$fileName\`";
}

void main() async {
  final file = File('../src/app/awk_icons.ts');
  final dir = Directory('src/assets/icons');
  final List<FileSystemEntity> entities = await dir.list().toList();
  final sortedFileName = entities.map((e) => e.uri.pathSegments.last).toList()
    ..sort();
  final sink = file.openWrite();
  sink.write("""
const prefix = "assets/icons";
enum AwkIcons {
    ${sortedFileName.map((e) => _enumItemFromFileName(e)).join(",\n")}
}

export type AwkIconsType =
    ${sortedFileName.map((e) => "\"${_enumNameFromFileName(e)}\"").join("|\n")};



function getAwkIconByKey(key: string): string | null {
  if (Object.keys(AwkIcons).includes(key)) {
    return AwkIcons[key as keyof typeof AwkIcons];
  } else {
    console.error('Invalid icon name');
    return null;
  }
}

export { AwkIcons, getAwkIconByKey };

  """);
}

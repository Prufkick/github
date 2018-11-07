    // const metricsData = {package: 'github'};
    // if (this.getPatch()) {
    //   metricsData.sizeInBytes = this.getByteSize();
    // }
    //
    // addEvent('file-patch-constructed', metricsData);
  getMarker() {
    return this.getPatch().getMarker();
  }

  getStartRange() {
    return this.getPatch().getStartRange();
  }

  containsRow(row) {
    return this.getPatch().containsRow(row);
  }

  buildStagePatchForLines(originalBuffer, nextLayeredBuffer, selectedLineSet) {
    let newFile = this.getOldFile();

    if (this.hasTypechange() && this.getStatus() === 'deleted') {
      // Handle the special case when symlink is created where an entire file was deleted. In order to stage the file
      // deletion, we must ensure that the created file patch has no new file.
      if (
        this.patch.getChangedLineCount() === selectedLineSet.size &&
        Array.from(selectedLineSet, row => this.patch.containsRow(row)).every(Boolean)
      ) {
        newFile = nullFile;
    const patch = this.patch.buildStagePatchForLines(
      originalBuffer,
      nextLayeredBuffer,
      selectedLineSet,
    );
    if (this.getStatus() === 'deleted') {
      // Populate newFile
      return this.clone({newFile, patch});
    } else {
      return this.clone({patch});
    }
  buildUnstagePatchForLines(originalBuffer, nextLayeredBuffer, selectedLineSet) {
    if (this.getStatus() === 'added') {
      if (
        selectedLineSet.size === this.patch.getChangedLineCount() &&
        Array.from(selectedLineSet, row => this.patch.containsRow(row)).every(Boolean)
      ) {
        // Ensure that newFile is null if the patch is an addition because we're deleting the entire file from the
        // index. If a symlink was deleted and replaced by a non-symlink file, we don't want the symlink entry to muck
        // up the patch.
        oldFile = nonNullFile;
        newFile = nullFile;
      }
    } else if (this.getStatus() === 'deleted') {
      if (
        selectedLineSet.size === this.patch.getChangedLineCount() &&
        Array.from(selectedLineSet, row => this.patch.containsRow(row)).every(Boolean)
      ) {
        oldFile = nullFile;
        newFile = nonNullFile;
      }
    const {patch, buffer, layers} = this.patch.buildUnstagePatchForLines(
      originalBuffer,
      nextLayeredBuffer,
      selectedLineSet,
    );
    return {
      filePatch: this.clone({oldFile, newFile, patch}),
      buffer,
      layers,
    };
  toStringIn(buffer) {
      return left.toStringIn(buffer) + right.toStringIn(buffer);
      return this.getHeaderString() + this.getPatch().toStringIn(buffer);
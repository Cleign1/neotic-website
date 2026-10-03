import assert from 'node:assert/strict'
import { readFile } from 'node:fs/promises'
import test from 'node:test'
import vm from 'node:vm'
import ts from 'typescript'

// Next cache APIs require a request context; isolate only that boundary.
const calls = []
const cache = new vm.SyntheticModule(['revalidatePath', 'revalidateTag'], function () {
  this.setExport('revalidatePath', (path) => calls.push(['path', path]))
  this.setExport('revalidateTag', (...args) => calls.push(['tag', ...args]))
})
const source = await readFile(new URL('../app/hooks/revalidate.ts', import.meta.url), 'utf8')
const compiled = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext } }).outputText
const hooks = new vm.SourceTextModule(compiled)
await hooks.link(() => cache)
await hooks.evaluate()
for (const [name, tag] of [
  ['revalidateBerita', 'berita'], ['revalidateBeritaDelete', 'berita'],
  ['revalidatePortofolio', 'portofolio'], ['revalidatePortofolioDelete', 'portofolio'],
]) {
  test(`${name} retains immediate cache expiry`, () => {
    calls.length = 0
    const doc = { id: 'test-id' }
    const result = hooks.namespace[name]({ doc, req: { payload: { logger: { info() {} } } } })
    assert.equal(result, doc)
    assert.ok(calls.some(call => call[0] === 'path' && call[1] === '/'))
    assert.deepEqual(calls.filter(call => call[0] === 'tag'), [['tag', tag, { expire: 0 }]])
  })
}

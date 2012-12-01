###
Configures interface from JSON file
###
@configureInterface: (Circuit, retry) ->
  # Todo:
  # 1: Read all components, and their corresponding types
  # 2: Read Sample Circuits (and default circuit)
  # 3: Load Color Scheme

# The Footer exports class(es) in this file via Node.js, if Node.js is defined.
# This is necessary for testing through Mocha in development mode.
#
# see script/test and the /test directory for details.
#
# To require this class in another file through Node, write {ClassName} = require(<path_to_coffee_file>)
root = module ? window
module.exports = CircuitLoader